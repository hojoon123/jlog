import { createClient } from '@/utils/supabase/server';

export default async function increaseViewCount(postId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('views')
    .eq('id', postId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const currentViews = data.views || 0;
  const { error: updateError } = await supabase
    .from('posts')
    .update({ views: currentViews + 1 })
    .eq('id', postId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return currentViews + 1;
}
