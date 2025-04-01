'use client'
import gsap, { useGSAP } from '@gsap/react';
import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Heading from '@/components/Heading';

export default function FindFriends() {
  const [friendsList, setFriendList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchFriends = useCallback(async () => {
    try {
      const response = await fetch(`/api/public/friends?page=${page}`);
      const data = await response.json();
      if (data?.friends?.length) {
        setFriendList(prevFriends => [...prevFriends, ...data.friends]);
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
  
  return (
    <div>
      <Heading>
        <div className='text-2xl text-zinc-600 p-5'>
          Find Friends
        </div>
      </Heading>
      <div className='px-3'>
        <InfiniteScroll
          dataLength={friendsList.length}
          next={fetchFriends}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-gray-500 text-center mt-3">No more friends to show.</p>}
        >
          {friendsList.map((e) => (
            <div key={e.id || `${e.createdAt}-${e.username}`} className="bg-white mb-3 p-5 rounded-lg border">
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
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
