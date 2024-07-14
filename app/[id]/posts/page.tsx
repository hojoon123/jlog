import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import getUserName from './[postId]/getUserName';
import getPostsByUser from './getPostsByUser';
import PostHeader from './PostHeader';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
    const { id } = params;
    const [userName, posts] = await Promise.all([
        getUserName(id),
        getPostsByUser(id)
    ]);

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />

        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mb-4">
            <h1 className="text-4xl font-bold mb-2">{userName}</h1>
            <p className="text-gray-600">유저의 소개 또는 다른 정보가 여기에 표시될 수 있습니다.</p>
            </div>
            {posts.map((post) => {
            const postDate = new Date(post.created_at);
            const now = new Date();
            const diffInDays = (now.getTime() - postDate.getTime()) / (1000 * 3600 * 24);
            const timeAgo = diffInDays < 7
                ? formatDistanceToNow(postDate, { addSuffix: true, locale: ko })
                : format(postDate, 'yyyy-MM-dd', { locale: ko });

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

        <Footer />
        </div>
    );
}
