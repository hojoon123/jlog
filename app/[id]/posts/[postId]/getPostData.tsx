import { createClient } from '@/utils/supabase/server';

export default async function getPostData(userId: string, postId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
