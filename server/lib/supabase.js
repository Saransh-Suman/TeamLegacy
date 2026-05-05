/**
 * Shared Supabase Client
 * Uses service key for administrative access in the backend.
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables in server');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
