/**
 * Coursera Scraper
 * Scrapes "electric vehicle" courses from Coursera search pages.
 */

import { chromium } from 'playwright';
import { parsePrice, detectLevel, detectTopic, isHiddenGem, convertUSDtoINR } from '../utils/clean.js';

export async function scrapeCoursera() {
  let attempts = 0;
  const maxRetries = 2;

  while (attempts <= maxRetries) {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto('https://www.coursera.org/search?query=electric%20vehicle', { waitUntil: 'networkidle' });
      
      await page.waitForSelector('.cds-ProductCard-grid');

      const courses = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.cds-ProductCard-grid'));
        return items.slice(0, 10).map(item => {
          const title = item.querySelector('.cds-ProductCard-title')?.innerText || '';
          const url = item.querySelector('a')?.href || '';
          const ratingText = item.querySelector('.cds-Rating-avg')?.innerText || '0';
          const metaInfo = item.querySelector('.cds-ProductCard-metadata')?.innerText || '';

          return {
            title,
            url,
            platform: 'coursera',
            rating: parseFloat(ratingText),
            metaInfo
          };
        });
      });

      const cleanedCourses = courses.map(c => {
        // Coursera prices are often not visible on search pages without login or special parameters.
        // For demonstration, we'll use a mock price if not found, or assume a standard subscription fee.
        const price_inr = 1200; // Mock standard price for Coursera
        const original_price_inr = 1200;
        
        const course = {
          title: c.title,
          url: c.url,
          platform: 'coursera',
          rating: c.rating,
          hours: 20, // Mock hours
          price_inr,
          original_price_inr,
          discount_percent: 0,
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
      console.error(`Coursera scraper attempt ${attempts + 1} failed:`, error.message);
      attempts++;
      await browser.close();
      if (attempts > maxRetries) throw error;
    }
  }
}
