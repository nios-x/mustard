import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { BiMessageSquareMinus } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { toast, Toaster } from 'sonner';
import { useRef } from 'react';
  
export default function PostContainer({ posts, fetchPosts,setPosts, hasMore }:{posts:any, setPosts:any, fetchPosts:any, hasMore:boolean}) {
  const copyText = async () => {
    try {
      const text = window.location.href;

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
      } else {
        // Fallback for mobile/older browsers
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
  
        // Update post state in UI
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
  
  
  
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Toaster/>
      <div className="text-xl text-gray-700 w-full p-3 bg-white font-semibold border rounded-lg z-[50]">
        Recent Posts
      </div>
      <div className="mt-4 space-y-4 overflow-y-scroll">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading...</h4>}
          endMessage={<p className="text-gray-500 text-center mt-3">No more posts to show.</p>}
        >
          {posts.map((post:any) => (
            <div key={`${post.createdAt}-${post.username}`} className="bg-white p-5 mb-6 rounded-lg border">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.avatarUrl || "https://static.vecteezy.com/system/resources/previews/035/727/704/non_2x/3d-realistic-person-or-people-user-social-network-icon-3d-rendering-illustration-vector.jpg"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <div className="font-semibold text-lg">{post.user.name}</div>
                  <div className="li text-sm">@{post.user.username}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-800">{post.content}</div>
              <div className="mt-2 text-gray-400 text-xs">
                {new Date(post.createdAt).toDateString()} at {new Date(post.createdAt).toTimeString().split("G")[0]}
              </div>
              <div className="flex cursor-pointer items-center px-1 py-1 justify-around mt-5 text-sm bg-zinc-50 gap-1  rounded-xl">
                <span onClick={()=>postLike(post.id)} className='text-red-500  active:bg-zinc-50  w-1/3 bg-gray-100 justify-center text-2xl flex py-1 rounded-xl px-2'>
                {!post.isLikedByCurrentUser?<IoHeartOutline className='scale-110'/>:<IoHeartSharp className='scale-110'/>}
                <span className='text-sm flex items-center  pl-1'> {post.likeCount!=0 && `x${post.likeCount}`}</span>
                </span>
                <span className='  text-cyan-800 active:bg-zinc-100  w-1/3 bg-gray-100 justify-center text-2xl flex py-1 rounded-xl px-2'>
                  <BiMessageSquareMinus/><span className='text-sm flex items-center  pl-1'> </span>
                </span>
                <span onClick={copyText} className='  text-green-800 active:bg-zinc-100  w-1/3 bg-gray-100 justify-center text-2xl flex py-1 rounded-xl px-2'>
                <RiShareForwardLine/>
                </span>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
