import NotFound from '@/app/not-found';
import Footer from '@/components/footer';
import Tabs from '@/components/home/HomeTab';
import PeriodSelector from '@/components/home/PeriodSelector';
import PostCard from '@/components/home/PostCard';
import Navbar from '@/components/navbar';
import { createClient } from '@/utils/supabase/server';

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

export async function generateMetadata({ params }: TrendingPageProps) {
  const { period } = params;
  return {
    title: `Trending Posts - ${period.charAt(0).toUpperCase() + period.slice(1)}`,
    description: `Check out the trending posts for the ${period} period.`,
    openGraph: {
      title: `Trending Posts - ${period.charAt(0).toUpperCase() + period.slice(1)}`,
      description: `Check out the trending posts for the ${period} period.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Trending Posts - ${period.charAt(0).toUpperCase() + period.slice(1)}`,
      description: `Check out the trending posts for the ${period} period.`,
    },
  };
}

async function fetchTrendingPosts(period: string): Promise<Post[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .rpc('get_trending_posts', { period })
    .order('views', { ascending: false });
  if (error) throw new Error(error.message);
  return data as Post[];
}

export default async function TrendingPage({ params }: TrendingPageProps) {
  try {
    const { period } = params;
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
