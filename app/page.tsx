import NotFound from '@/app/not-found';
import Footer from '@/components/footer';
import Tabs from '@/components/home/HomeTab';
import PeriodSelector from '@/components/home/PeriodSelector';
import PostCard from '@/components/home/PostCard';
import Navbar from '@/components/navbar';
import { createClient } from '@/utils/supabase/server';

export const metadata = {
  title: `Daily JLog - Trending Posts - weekly`,
    description: `Check out the trending posts for the week period.`,
    openGraph: {
      title: `Daily JLog - Trending Posts - weekly`,
      description: `Check out the trending posts for the week period.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Daily JLog - Trending Posts - weekly`,
      description: `Check out the trending posts for the week period.`,
    },
};

type Post = {
  id: string;
  title: string;
  markdown: string;
  created_at: string;
  views: number;
  user_id: string;
};

type TrendingPageProps = {
  params: {
    period: string;
  };
};


async function fetchTrendingPosts(period: string): Promise<Post[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_trending_posts', { period });
  if (error) throw new Error(error.message);
  return data as Post[];
}

export default async function TrendingPage({ params }: TrendingPageProps) {
  try {
    const period = 'week';
    const posts = await fetchTrendingPosts(period);

    return (
      <div className="flex-1 w-full flex flex-col items-center">
        <Navbar userId="" />
        <div className="w-full max-w-4xl mt-4 mb-6">
          <Tabs activeTab="trend" />
          <div className="flex justify-end my-7 px-3">
            <PeriodSelector currentPeriod={period} />
          </div>
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 mb-20">조건에 맞는 포스팅이 존재하지 않습니다.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 mb-10">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    NotFound();
  }
}
