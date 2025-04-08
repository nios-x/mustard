// components/Post.tsx

import React from 'react';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { BiMessageSquareMinus } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { toast } from 'sonner';

export default function Post({ post, postLike, copyText }: { post: any, postLike: (id: string) => void, copyText: () => void }) {
  return (
    <div className="bg-white p-5 mb-6 rounded-lg border">
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
        <span onClick={() => postLike(post.id)} className='text-red-500 active:bg-zinc-50 w-1/3 bg-gray-100 justify-center text-2xl flex py-1 rounded-xl px-2'>
          {!post.isLikedByCurrentUser ? <IoHeartOutline /> : <IoHeartSharp />}
          <span className='text-sm flex items-center pl-1'>{post.likeCount !== 0 && `x${post.likeCount}`}</span>
        </span>
        <span className='text-cyan-800 active:bg-zinc-100 w-1/3 bg-gray-100 justify-center text-2xl flex py-1 rounded-xl px-2'>
          <BiMessageSquareMinus />
        </span>
        <span onClick={copyText} className='text-green-800 active:bg-zinc-100 w-1/3 bg-gray-100 justify-center text-2xl flex py-1 rounded-xl px-2'>
          <RiShareForwardLine />
        </span>
      </div>
    </div>
  );
}
