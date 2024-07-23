import fetchPostMetadata from '@/components/fetchPostMetadata';
import Footer from '@/components/footer';
import getTimeAgo from '@/components/getTimeAgo';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Metadata } from 'next';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { title, description, tags } = await fetchPostMetadata(params.postId);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://localhost:3000/${params.id}/posts/${params.postId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    keywords: tags,
  };
}


export default async function Page({ params }: PageProps) {
  const { id, postId } = params;
  try{
    const [post, userName] = await Promise.all([getPostData(id, postId), getUserName(id)]);
    const headers = await extractHeaders(post.markdown);
    const timeAgo = getTimeAgo(post.created_at);

    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center bg-white">
        <Navbar userId={id} />
        <div className="flex justify-center w-full max-w-6xl">
          <main className="flex-grow py-12 px-4 max-w-4xl bg-white shadow-md rounded-lg">
            <Suspense fallback={<div>Loading post...</div>}>
              <Post post={{ ...post, userName, timeAgo }} />
            </Suspense>
          </main>
          <aside className="hidden md:block w-1 flex-shrink-0">
            <Sidebar headers={headers} />
          </aside>
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