import Link from 'next/link';

interface PostHeaderProps {
    post: {
      id: string;
      title: string;
      tags: string[];
      user_id: string;
      userName: string;
      timeAgo: string;
    };
  }
  
  export default function PostHeader({ post }: PostHeaderProps) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 py-6 bg-white shadow-md rounded-lg mb-4 hover:bg-gray-100 cursor-pointer">
        <Link href={`/${post.user_id}/posts/${post.id}`}>
        <h2 className="text-2xl font-bold mb-2 text-black">{post.title}</h2>
        <div className="text-gray-600 py-2">
          <span className="mr-2">{post.userName}</span>
          <span>{post.timeAgo}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-green-200 px-4 py-2 rounded-full text-black">
              {tag}
            </span>
          ))}
        </div>
        </Link>
    </div>
    );
  }