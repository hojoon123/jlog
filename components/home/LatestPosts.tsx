// components/LatestPosts.tsx
'use client';

import { createClient } from '@/utils/supabase/server';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';

const fetchLatestPosts = async (offset = 0, limit = 10) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw new Error(error.message);
  return data;
};

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const loadMore = () => {
    setLoading(true);
    fetchLatestPosts(offset + 10).then((data) => {
      setPosts((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 10);
      setLoading(false);
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      <button onClick={loadMore} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Load More
      </button>
    </div>
  );
};

export default LatestPosts;
