import 'dotenv/config';
import { supabase } from './server/lib/supabase.js';

async function test() {
  const { data, error } = await supabase.from('creator_courses').select('*').eq('creator_id', 'user_test_001');
  console.log('Courses for user_test_001:', data?.length);
  if (data && data.length > 0) {
    const id = data[0].id;
    console.log(`Hitting /api/creator/${id}/suggestions directly in code:`);
    
    // Test the route logic directly
    const { data: course, error: cError } = await supabase
      .from('creator_courses')
      .select('*')
      .eq('id', id)
      .single();
    
    console.log('Course fetch by ID result:', { courseId: course?.id, cError });
  } else {
    console.log("No courses found for user_test_001! Did you register one?");
  }
}
test();
