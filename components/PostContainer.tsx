"use client"
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast, Toaster } from 'sonner';
import { useRef } from 'react';
import Post from '@/components/Post'; // Adjust path based on your structure
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { Textarea } from './ui/textarea';
import { useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';

export default function PostContainer({ isRecentPost, posts, fetchPosts, setPosts, hasMore }: { isRecentPost?: any, posts: any, setPosts: any, fetchPosts: any, hasMore: boolean }) {

  const copyText = async (id: string) => {
    try {
      const text = `${new URL(window.location.href).host}/posts/${id}`;
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        successful
          ? toast.success("Copied to clipboard!")
          : toast.error("Failed to copy.");
      }
    } catch (err) {
      toast.error("Failed to copy.");
      console.error(err);
    }
  }
  const likeDebounceRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const postLike = async (postid: string) => {
    if (likeDebounceRef.current[postid]) {
      clearTimeout(likeDebounceRef.current[postid]);
    }

    likeDebounceRef.current[postid] = setTimeout(async () => {
      try {
        const res = await fetch("/api/public/likes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ postid }),
        });
        const result = await res.json();
        if (!result.success) {
          toast.error("Failed to update like.");
          return;
        }
        setPosts((prevPosts: any[]) =>
          prevPosts.map(post => {
            if (post.id === postid) {
              const isLiked = post.isLikedByCurrentUser;
              return {
                ...post,
                isLikedByCurrentUser: !isLiked,
                likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1,
              };
            }
            return post;
          })
        );

        toast.success(result.response === "added" ? "Liked!" : "Unliked!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    }, 300); // 300ms debounce time
  };
  const [comment, setComment] = useState(true);
  const [commenttid, setCommentId] = useState("")
  const [commentData, setCommentData] = useState("")
  const setTheComment = (id:string)=>{
    setCommentId(id)
    setComment(true)
    console.log(id)
  }
  const postComment = async()=>{
    const response = fetch("/api/public/comments",{
      method:"POST",
      body:JSON.stringify({"id":commenttid, comment:commentData}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = (await response).json();
    console.log(data)
  }
  const getAllComments=async()=>{
   const response = await fetch("/api/public/comments",{
      method:"POST",
      body:JSON.stringify({"id":commenttid, comment:commentData}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json();
    console.log(data)   
  }
  useEffect(()=>{
    if(commenttid!="")
    getAllComments()
  },[commenttid])
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Drawer open={comment} onOpenChange={setComment}>
        <DrawerTrigger asChild>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <div className="h-[90vh]">
              <DrawerTitle>Comments</DrawerTitle>
              <DrawerDescription>
                <div className="pt-3" />
                <Textarea value={commentData} onChange={(e)=>{setCommentData(e.target.value)}} className="h-[23px]" />
                <Button onClick={()=>{postComment(); setComment(false)}} className="w-full mt-2">Submit</Button>
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


      <Toaster />
      {isRecentPost && <div className="text-xl text-gray-700 w-full p-3 bg-white font-semibold border rounded-lg z-[50]">
        Recent Posts
      </div>}
      {!isRecentPost && <div className="text-xl flex gap-3 items-center text-gray-700 w-full p-3 bg-white font-semibold border rounded-lg z-[50]">
        <Link href={"/"}>  <IoIosArrowBack /></Link> Flicked
      </div>}
      <div className="mt-4 space-y-4 ">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading...</h4>}
          endMessage={<p className="text-gray-500 text-center mt-3 text-sm">No more posts to show.</p>}
        >
          {posts.map((post: any) => (
            <Post setTheComment={setTheComment} key={`${post.createdAt}-${post.username}`} post={post} postLike={postLike} copyText={copyText} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
