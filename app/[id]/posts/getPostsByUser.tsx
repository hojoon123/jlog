// getPostsByUser.ts
import { createClient } from '@/utils/supabase/server';

export default async function getPostsByUser(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, tags, created_at')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
}