/**
 * Scraper Scheduler
 * Runs the orchestrator every 6 hours using node-cron.
 */

import cron from 'node-cron';
import { runOrchestrator } from './index.js';

// Run every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log(`[${new Date().toISOString()}] Starting scheduled scraper run...`);
  await runOrchestrator();
  
  const nextRun = new Date(Date.now() + 6 * 60 * 60 * 1000);
  console.log(`Next run scheduled for: ${nextRun.toISOString()}`);
});

console.log('Scraper scheduler started. Running every 6 hours.');
const nextRun = new Date(Date.now() + 6 * 60 * 60 * 1000);
console.log(`Next run scheduled for: ${nextRun.toISOString()}`);
