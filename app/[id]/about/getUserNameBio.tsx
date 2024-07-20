import { createClient } from '@/utils/supabase/server';

export default async function getUserNameBio(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('name, bio') // Also fetch bio
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
