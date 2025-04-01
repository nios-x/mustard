import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function PostContainer({ posts, fetchPosts, hasMore }:{posts:any, fetchPosts:any, hasMore:boolean}) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
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
                  <div className="text-gray-500 text-sm">@{post.user.username}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-800">{post.content}</div>
              <div className="mt-2 text-gray-400 text-xs">
                {new Date(post.createdAt).toDateString()} at {new Date(post.createdAt).toTimeString().split("G")[0]}
              </div>
              <div className="flex justify-around mt-5 text-sm bg-zinc-50 p-2 rounded-xl">
                <span>Like</span>
                <span>Comments</span>
                <span>Share</span>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
