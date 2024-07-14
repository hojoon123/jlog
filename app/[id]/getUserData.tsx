import { createClient } from '@/utils/supabase/server';

export default async function getUserData(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('name, bio')
      .eq('id', userId)
      .single();
  
    if (error) throw new Error(error.message);
    return data;
  }