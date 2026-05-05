/**
 * Udemy Scraper
 * Scrapes "electric vehicle" courses from Udemy search pages.
 */

import { chromium } from 'playwright';
import { parsePrice, detectLevel, detectTopic, isHiddenGem } from '../utils/clean.js';

export async function scrapeUdemy() {
  let attempts = 0;
  const maxRetries = 2;

  while (attempts <= maxRetries) {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      // Using a search query for electric vehicles
      await page.goto('https://www.udemy.com/courses/search/?q=electric+vehicle', { waitUntil: 'networkidle' });
      
      // Wait for course cards to load
      await page.waitForSelector('.course-card--container--mdf-8');

      const courses = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.course-card--container--mdf-8'));
        return items.slice(0, 10).map(item => {
          const title = item.querySelector('.course-card--course-title--37pS-')?.innerText || '';
          const url = item.querySelector('a')?.href || '';
          const ratingText = item.querySelector('.star-rating--rating-number--39o8X')?.innerText || '0';
          const hoursText = item.querySelector('.course-card--course-meta-info--16ay6')?.innerText || '';
          const priceText = item.querySelector('.price-text--price-part--2npO8 span:not(.sr-only)')?.innerText || '';
          const originalPriceText = item.querySelector('.price-text--price-part--2npO8 s span:not(.sr-only)')?.innerText || '';

          return {
            title,
            url,
            platform: 'udemy',
            rating: parseFloat(ratingText),
            hours: hoursText,
            priceText,
            originalPriceText
          };
        });
      });

      const cleanedCourses = courses.map(c => {
        const price_inr = parsePrice(c.priceText);
        const original_price_inr = parsePrice(c.originalPriceText) || price_inr;
        const discount_percent = original_price_inr > 0 ? Math.round(((original_price_inr - price_inr) / original_price_inr) * 100) : 0;
        const hoursNum = parseFloat(c.hours.replace(/[^\d.]/g, '')) || 0;

        const course = {
          title: c.title,
          url: c.url,
          platform: 'udemy',
          rating: c.rating,
          hours: hoursNum,
          price_inr,
          original_price_inr,
          discount_percent,
          level: detectLevel(c.title),
          topic: detectTopic(c.title),
          scraped_at: new Date().toISOString()
        };
        course.hidden_gem = isHiddenGem(course);
        return course;
      });

      await browser.close();
      return cleanedCourses;
    } catch (error) {
      console.error(`Udemy scraper attempt ${attempts + 1} failed:`, error.message);
      attempts++;
      await browser.close();
      if (attempts > maxRetries) throw error;
    }
  }
}
