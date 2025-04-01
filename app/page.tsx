"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CreateAPost from "@/components/CreateAPost";
import PostContainer from "@/components/PostContainer";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.from('.box', { x: "-100vw", stagger: 0.2, duration: 0.5 });
    tl.to(".box", { opacity: 0, stagger: 0.2, duration: 0.5 });
  });
  const fetchPosts = useCallback(async () => {
    const response = await fetch(`/api/public/create-post?page=${page}`, {
      credentials: "include",
      method: "GET"
    });
    const data = await response.json();
    if(data.status ==="BAD"){
      setIsLoading(false)
      return;
    }
    if (data?.posts?.length) {
      console.log(data.posts.length)
      setIsLoading(false);
      setPage(prev => prev + 1);
      setPosts(op => [...op, ...data.posts]);
    } else {
      setHasMore(false);
    }
  }, [page]); 
  useEffect(() => {
    fetchPosts();
  }, []); 
  
  return (
    <div>
      <CreateAPost posts={posts} setPosts={setPosts} />

      {isLoading && (
        <>
          <div className="flex flex-col space-y-3 justify-center items-center mt-8">
            <Skeleton className="box h-[180px] w-[85vw] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="box h-5 w-[85vw]" />
              <Skeleton className="box h-5 w-[70vw]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3 relative justify-center items-center mt-6">
            <Skeleton className="box h-[180px] w-[85vw]  rounded-xl" />
            <div className="space-y-2 relative">
              <Skeleton className="box h-5 w-[85vw]  " />
              <Skeleton className="box h-5 w-[70vw] " />
            </div>
          </div>
        </>
      )}
      {!isLoading && <PostContainer posts={posts} fetchPosts={fetchPosts} hasMore={hasMore} />}
    </div>
  );
}
