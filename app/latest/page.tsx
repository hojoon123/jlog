import Footer from '@/components/footer';
import Tabs from '@/components/home/HomeTab';
import PostCard from '@/components/home/PostCard';
import Navbar from '@/components/navbar';
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata() {
  return {
    title: 'Latest Posts',
    description: 'Check out the latest posts from our blog.',
    openGraph: {
      title: 'Latest Posts',
      description: 'Check out the latest posts from our blog.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Latest Posts',
      description: 'Check out the latest posts from our blog.',
    },
  };
}


async function fetchLatestPosts() {
  const supabase = createClient();
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export default async function LatestPage() {
  const posts = await fetchLatestPosts();
    
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar userId="" />
      <div className="w-full max-w-4xl mt-4 mb-6">
        <Tabs activeTab="latest" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-20 px-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
