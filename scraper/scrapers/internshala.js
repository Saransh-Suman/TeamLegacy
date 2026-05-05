/**
 * Internshala Scraper
 * Scrapes electric vehicle training from Internshala.
 */

import { chromium } from 'playwright';
import { parsePrice, detectLevel, detectTopic, isHiddenGem } from '../utils/clean.js';

export async function scrapeInternshala() {
  let attempts = 0;
  const maxRetries = 2;

  while (attempts <= maxRetries) {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto('https://trainings.internshala.com/search?query=electric+vehicle', { waitUntil: 'networkidle' });
      
      await page.waitForSelector('.training_card');

      const courses = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.training_card'));
        return items.slice(0, 10).map(item => {
          const title = item.querySelector('.training_name')?.innerText || '';
          const url = item.querySelector('a')?.href || '';
          const ratingText = item.querySelector('.rating')?.innerText || '0';
          const priceText = item.querySelector('.discounted_price')?.innerText || '';
          const originalPriceText = item.querySelector('.original_price')?.innerText || '';

          return {
            title,
            url,
            platform: 'internshala',
            rating: parseFloat(ratingText),
            priceText,
            originalPriceText
          };
        });
      });

      const cleanedCourses = courses.map(c => {
        const price_inr = parsePrice(c.priceText);
        const original_price_inr = parsePrice(c.originalPriceText) || price_inr;
        const discount_percent = original_price_inr > 0 ? Math.round(((original_price_inr - price_inr) / original_price_inr) * 100) : 0;

        const course = {
          title: c.title,
          url: c.url,
          platform: 'internshala',
          rating: c.rating,
          hours: 40, // Internshala trainings are usually longer
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
      console.error(`Internshala scraper attempt ${attempts + 1} failed:`, error.message);
      attempts++;
      await browser.close();
      if (attempts > maxRetries) throw error;
    }
  }
}
