import React from 'react';

export default function PostContainer(props: any) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
    <div className="text-xl  top-[76.2px] text-gray-700 w-full p-3 bg-white font-semibold  border rounded-lg z-[50]">
  Recent Posts
</div>
      <div className="mt-4 space-y-4">
        {props.posts.map((e: any) => (
          <div key={e.createdAt}
            className="bg-white p-5 rounded-lg shadow-md border"
          >
            <div className="flex items-center space-x-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/035/727/704/non_2x/3d-realistic-person-or-people-user-social-network-icon-3d-rendering-illustration-vector.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <div className="font-semibold text-lg">{e.user.name}</div>
                <div className="text-gray-500 text-sm">@{e.user.username}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-800">{e.content}
            </div>
            <div className="mt-2 text-gray-400 text-xs">
              {new Date(e.createdAt).toDateString()} at {new Date(e.createdAt).toTimeString().split("G")[0]}
            </div>
            <div className='flex justify-around mt-5 text-sm bg-zinc-50 p-2 rounded-xl'>
              <span>Like</span>
              <span>Comments</span>
              <span>Share</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
