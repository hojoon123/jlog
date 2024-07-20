import { createClient } from '@/utils/supabase/server';

export default async function getUserNameIntro(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('name, one_line_intro')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
