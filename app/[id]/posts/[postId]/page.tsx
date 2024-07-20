import Footer from '@/components/footer';
import getTimeAgo from '@/components/getTimeAgo';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import increaseViewCount from '@/components/tutorial/incrementViews';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import extractHeaders from './extractHeaders';
import getPostData from './getPostData';
import getUserName from './getUserName';
import Post from './post';

interface PageProps {
  params: {
    id: string;
    postId: number;
  };
}

export default async function Page({ params }: PageProps) {
  const { id, postId } = params;
  try{
    const [post, userName, views] = await Promise.all([getPostData(id, postId), getUserName(id), increaseViewCount(postId)]);
    const headers = await extractHeaders(post.markdown);
    const timeAgo = getTimeAgo(post.created_at);

    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar userId={id} />
        <div className="flex justify-center w-full">
          <main className="flex-1 px-8 max-w-4xl">
            <Suspense fallback={<div>Loading post...</div>}>
              <Post post={{ ...post, userName, timeAgo }} />
            </Suspense>
          </main>
          <div className="rounded-lg">
            <Sidebar headers={headers} />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
  catch (error) {
    console.error(error);
    notFound(); // 오류 발생 시 not-found 페이지로 리디렉션
}
}