/**
 * Utility functions for cleaning and processing scraped data.
 */

/**
 * Strips currency symbols and commas, converts to number.
 */
export function parsePrice(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[₹,$\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Converts USD to INR.
 */
export function convertUSDtoINR(usd) {
  return Math.round(usd * 83.5 * 100) / 100;
}

/**
 * Detects course level based on keywords in title.
 */
export function detectLevel(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('advanced') || lowerTitle.includes('expert')) return 'advanced';
  if (lowerTitle.includes('intermediate')) return 'intermediate';
  return 'beginner';
}

/**
 * Detects topic based on keywords in title.
 */
export function detectTopic(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('battery') || lowerTitle.includes('bms')) return 'battery';
  if (lowerTitle.includes('charging') || lowerTitle.includes('station')) return 'charging';
  if (lowerTitle.includes('motor') || lowerTitle.includes('drive')) return 'motor';
  return 'general';
}

/**
 * Determines if a course is a "hidden gem".
 */
export function isHiddenGem(course) {
  return course.rating > 4.3 && course.price_inr < 999;
}
