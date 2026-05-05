/**
 * Scraper Orchestrator
 * Runs all scrapers sequentially and updates Supabase.
 */

import 'dotenv/config';
import { scrapeUdemy } from './scrapers/udemy.js';
import { scrapeCoursera } from './scrapers/coursera.js';
import { scrapeInternshala } from './scrapers/internshala.js';
import { upsertCourses } from './utils/supabase.js';

async function runOrchestrator() {
  console.log('--- Starting Scraper Orchestrator ---');
  
  const scrapers = [
    { name: 'Udemy', fn: scrapeUdemy },
    { name: 'Coursera', fn: scrapeCoursera },
    { name: 'Internshala', fn: scrapeInternshala }
  ];

  for (const scraper of scrapers) {
    try {
      console.log(`Running ${scraper.name} scraper...`);
      const courses = await scraper.fn();
      console.log(`Successfully scraped ${courses.length} courses from ${scraper.name}.`);
      
      if (courses.length > 0) {
        await upsertCourses(courses);
        console.log(`Upserted ${courses.length} courses from ${scraper.name} to Supabase.`);
      }
    } catch (error) {
      console.error(`Error in ${scraper.name} scraper:`, error.message);
    }
  }

  console.log('--- Scraper Orchestrator Completed ---');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runOrchestrator();
}

export { runOrchestrator };
