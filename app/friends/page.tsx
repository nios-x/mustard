'use client';

import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function Friends() {
  const [friendsList, setFriendList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFriends = useCallback(async () => {
    try {
      const response = await fetch(`/api/public/friends?page=${page}`);
      const data = await response.json();
      console.log(data)
      if (data?.friends?.length) {
        setFriendList((prevFriends) => [...prevFriends, ...data.friends]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleUnfollow = async (friend: any) => {
    try {
      const response = await fetch('/api/public/friends/remove-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: friend.id })
      });
      console.log(response)
      const data = await response.json();

      if (data.removed) {
        setFriendList((prevFriends) => prevFriends.filter(f => f.id !== friend.id));
        toast.success(`Unfollowed ${friend.name}`);
      }
    } catch (error) {
      toast.error('Failed to update follow status');
    }
  };

  return (
    <div>
      <Toaster />
      <Heading>
        <div className='text-2xl mt-3 text-zinc-600 pt-5  '>
          <div className='px-2 pt-2 bg-zinc-200 rounded-t-md flex  items-baseline gap-x-4'>

          <div className='bg-zinc-800 text-lg text-white  rounded-t-lg px-4 py-1'>Friends</div>
          <Link href={'/find-friends'} className='text-sm px-1 text-blue-500'>Find Friends</Link>
          <Link href={'/accept-friends'} className='text-sm px-1 pr-2 text-blue-500'>Requests</Link>
          </div>
        </div>
      </Heading>
      <div className='w-full h-[0.6px] mb-4 bg-zinc-300'></div>
      <div className='px-3'>
        <InfiniteScroll
          dataLength={friendsList.length}
          next={fetchFriends}
          hasMore={hasMore}
          loader={<h4 className='mt-8 text-sm  text-center'>Loading...</h4>}
          endMessage={<p className='text-gray-500 text-center mt-10 text-sm'>No more friends to show.</p>}
        >
          {friendsList.map((e) => (
            <div key={e.id} className='bg-white z-10 mb-3 p-5 rounded-lg border'>
              <div className='flex items-center space-x-3'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/035/727/704/non_2x/3d-realistic-person-or-people-user-social-network-icon-3d-rendering-illustration-vector.jpg'
                  alt='User Avatar'
                  className='w-10 h-10 rounded-full border'
                />
                <div>
                  <div className='font-semibold text-lg'>{e.name}</div>
                  <div className='text-gray-500 text-sm'>@{e.username}</div>
                </div>
              </div>
              <div className='mt-2 text-gray-400 text-xs'>
                Joined: {new Date(e.createdAt).toDateString()} at {new Date(e.createdAt).toLocaleTimeString()}
              </div>
              <div className='flex justify-end'>
                <button onClick={() => handleUnfollow(e)} className='bg-gradient-to-br from-red-500 text-sm to-red-400 py-2 px-3 rounded-full text-white'>Unfollow</button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
