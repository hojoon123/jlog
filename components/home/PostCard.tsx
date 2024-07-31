'use client';

import Link from 'next/link';

type PostProps = {
  post: {
    id: string;
    user_id: string;
    title: string;
    markdown: string;
    created_at: string;
    views: number;
  };
};

export default function PostCard({ post }: PostProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        <Link href={`/${post.user_id}/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="text-gray-500 mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
      <p className="text-gray-500">조회수: {post.views || 0}</p>
    </div>
  );
}
