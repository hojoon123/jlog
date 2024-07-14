import { createClient } from '@/utils/supabase/server';

export default async function getUserPosts(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId);
  
    if (error) throw new Error(error.message);
    return data;
  }