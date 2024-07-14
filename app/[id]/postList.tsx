interface PostListProps {
    posts: any[];
  }
  
  export default function PostList({ posts }: PostListProps) {
    return (
      <div>
        {posts.map((post) => (
          <article key={post.id} className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mb-4">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </article>
        ))}
      </div>
    );
  }
  