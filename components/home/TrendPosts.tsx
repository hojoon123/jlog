import { createClient } from '@/utils/supabase/server';
import { use } from 'react';
import PostCard from './postCard';

const fetchPosts = async (period: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_trending_posts', { period });
  if (error) throw new Error(error.message);
  return data;
};

const TrendPosts = ({ period }: { period: string }) => {
  const posts = use(fetchPosts(period));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TrendPosts;