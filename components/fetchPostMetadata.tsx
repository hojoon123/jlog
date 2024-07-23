import { createClient } from '@/utils/supabase/server';

export default async function fetchPostMetadata(postId: number) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts')
        .select('title, description, tags')
        .eq('id', postId)
        .single();

    if (error) throw new Error(error.message);
    return data;
}
