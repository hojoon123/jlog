// components/PostCard.tsx
'use client';

import Link from 'next/link';

export default async function PostCard({ post }: { post: any }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.markdown}</p>
      <p className="text-gray-500 mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
      <p className="text-gray-500">Views: {post.views}</p>
    </div>
  );
};
