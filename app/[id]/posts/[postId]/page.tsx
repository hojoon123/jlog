import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Suspense } from 'react';
import extractHeaders from './extractHeaders';
import getPostData from './getPostData';
import getUserName from './getUserName';
import Post from './post';

interface PageProps {
  params: {
    id: string;
    postId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id, postId } = params;
  const post = await getPostData(id, postId);
  const userName = await getUserName(id);
  const headers = await extractHeaders(post.markdown);

  const postDate = new Date(post.created_at);
  const now = new Date();
  const diffInDays = (now.getTime() - postDate.getTime()) / (1000 * 3600 * 24);
  const timeAgo = diffInDays < 7
    ? formatDistanceToNow(postDate, { addSuffix: true, locale: ko }) 
    : format(postDate, 'yyyy-MM-dd', { locale: ko });

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
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