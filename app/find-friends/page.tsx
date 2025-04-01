'use client'
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
export default function FindFriends() {
  const [friendsList, setFriendList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchFriends = useCallback(async () => {
    try {
      const response = await fetch(`/api/public/find-friends?page=${page}`);
      const data = await response.json();
      console.log(data)
      if (data?.users?.length) {
        setFriendList(prevFriends => [...prevFriends, ...data.users]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchFriends();
  }, []);
  
  const handleFollow = (friend: any) => {
    console.log("Followed:", friend);
  };
  
  return (
    <div>
      <Heading>
      <div className='text-2xl text-zinc-600 p-5'>
      Find Friends <Link href={"/friends"} className='text-sm text-blue-500 '>Friends</Link>
        </div>
      </Heading>
      <div className='px-3'>
        <InfiniteScroll
          dataLength={friendsList.length}
          next={fetchFriends}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-gray-500  text-center mt-3">No more friends to show.</p>}
        >
          {friendsList.map((e) => (
            <div key={e.id || `${e.createdAt}-${e.username}`} className="bg-white  z-10 mb-3 p-5 rounded-lg border">
              <div className="flex items-center space-x-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/035/727/704/non_2x/3d-realistic-person-or-people-user-social-network-icon-3d-rendering-illustration-vector.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <div className="font-semibold text-lg">{e.name}</div>
                  <div className="text-gray-500 text-sm">@{e.username}</div>
                </div>
              </div>
              <div className="mt-2 text-gray-400 text-xs">
                Joined: {new Date(e.createdAt).toDateString()} at {new Date(e.createdAt).toLocaleTimeString()}
              </div>
              <div className='flex justify-end'> 
                <button     onClick={() => handleFollow(e)} className=' static top-1/2 bg-gradient-to-br from-red-500 text-sm to-orange-400 py-2 px-3 rounded-full text-white'>Follow</button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
