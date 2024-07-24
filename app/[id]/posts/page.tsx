import Footer from '@/components/footer';
import getTimeAgo from '@/components/getTimeAgo';
import Navbar from '@/components/navbar';
import TabButtons from '@/components/tabButtons';
import { notFound } from 'next/navigation';
import getPostsByUser from './getPostsByUser';
import getUserNameIntro from './getUserNameIntro';
import PostHeader from './PostHeader';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  try {  
    const { id } = params;
      const userData = await getUserNameIntro(id);
      const { name, one_line_intro } = userData;
    
      return {
        title: `${name} - Posts`,
        description: one_line_intro,
        openGraph: {
          title: `${name} - Posts`,
          description: one_line_intro,
        },
        twitter: {
          card: 'summary_large_image',
          title: `${name} - Posts`,
          description: one_line_intro,
        },
      };
    } catch (error) {
      notFound(); // 오류 발생 시 not-found 페이지로 리디렉션
    }
  }

export default async function Page({ params }: PageProps) {
    const { id } = params;
    try {
        const [userData, posts] = await Promise.all([
          getUserNameIntro(id),
          getPostsByUser(id)
        ]);

        const userName = userData.name;
        const oneLineIntro = userData.one_line_intro;

        return (
            <div className="flex-1 w-full flex flex-col gap-10 items-center">
            <Navbar userId={id} />
            <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mb-4">
                    <h1 className="text-4xl text-gray-900 font-bold mb-2 py-2">{userName}</h1>
                    <p className="text-gray-600 font-bold px-1">{oneLineIntro}</p>
                </div>
                <div className='py-6'>
                    <TabButtons userId={id} />
                </div>

                {posts.map((post) => {
                const timeAgo = getTimeAgo(post.created_at);

                return (
                    <PostHeader
                    key={post.id}
                    post={{
                        ...post,
                        user_id: id,
                        userName,
                        timeAgo,
                    }}
                    />
                );
                })}
            </div>

            <Footer />
            </div>
        );
    } catch (error) {
        notFound(); // 오류 발생 시 not-found 페이지로 리디렉션
    }
}
