// [id]/series/[seriesId]/page.tsx
import Footer from '@/components/footer';
import getTimeAgo from '@/components/getTimeAgo';
import Navbar from '@/components/navbar';
import TabButtons from '@/components/tabButtons';
import { createClient } from '@/utils/supabase/server';
import PostHeader from '../../posts/PostHeader';
import getUserNameIntro from '../../posts/getUserNameIntro';

interface PageProps {
  params: {
    id: string;
    seriesId: string;
  };
}

async function getPostsBySeries(userId: string, series: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .eq('series', series)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export default async function Page({ params }: PageProps) {
  const { id: userId, seriesId } = params;
  const [posts, userData] = await Promise.all([
    getPostsBySeries(userId, decodeURIComponent(seriesId)),
    getUserNameIntro(userId),
  ]);
  const userName = userData.name;
  const oneLineIntro = userData.one_line_intro;

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <Navbar userId={userId} />
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mb-4">
          <h1 className="text-4xl font-bold mb-2 py-2">{userName}</h1>
          <p className="text-gray-600 font-bold px-1">{oneLineIntro}</p>
        </div>
        <div className='py-6'>
            <TabButtons userId={userId} />
        </div>

        <div className="w-full max-w-3xl p-4 bg-netural rounded-lg mb-4">
          <h1 className="text-4xl font-bold mb-4 py-2">{decodeURIComponent(seriesId)}</h1>
          <div className='flex flex-wrap gap-2 py-4'>
          {posts.map((post) => {
            const timeAgo = getTimeAgo(post.created_at);

            return (
              <PostHeader
                key={post.id}
                post={{
                  ...post,
                  userName,
                  timeAgo,
                }}
              />
            );
          })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
