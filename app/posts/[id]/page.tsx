"use client"
import React, {useEffect, useState, useCallback} from 'react';
import PostContainer from "@/components/PostContainer";
import { useParams } from 'next/navigation';

export default function Home() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const params = useParams<{ id: string }>();
  const { id } = params;
  const fetchPosts = useCallback(async () => {
    const response = await fetch(`/api/public/get-post?id=${id}`, {
      credentials: "include",
      method: "GET"
    });
    const data = await response.json();
    console.log(data)
    if(data.status ==="BAD"){
      setIsLoading(false)
      return;
    }
    if (data?.posts?.length) {
      console.log(data.posts.length)
      setIsLoading(false);
      setPosts(data.posts);
    } else {
      setHasMore(false);
    }
  }, []); 
  useEffect(() => {
    fetchPosts();
  }, []); 
  
  return (
    <div>
      {isLoading && <div className='my-10 h-[60vh] flex items-center justify-center   text-center'>Loading...</div>}
      {!isLoading && <PostContainer isRecentPost={false} posts={posts} setPosts={setPosts} fetchPosts={fetchPosts} hasMore={hasMore} />}
    </div>
  );
}

 
