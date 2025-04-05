'use client';

import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function FindFriends() {
  const [friendsList, setFriendList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFriends = useCallback(async () => {
    try {
      const response = await fetch(`/api/public/find-friends?page=${page}`);
      const data = await response.json();
      if (data?.users?.length) {
        setFriendList((prevFriends) => [...prevFriends, ...data.users]);
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

  const handleFollow = async (friendId: string) => {
    try {
      const response = await fetch('/api/public/friends/add-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId })
      });
      const data = await response.json();
      alert(data.response);
      if (data.response) {
        toast.success('Friend request sent');
      } else {
        toast.error('Failed to send request');
      }
    } catch (error) {
      toast.error('Failed to send request');
    }
  };

  return (
    <div>
      <Toaster />
      
      <Heading>
        <div className='text-2xl mt-3 text-zinc-600 pt-5  '>
          <div className='px-2 pt-2 bg-zinc-200 rounded-t-xl flex  items-baseline gap-x-4'>
          <Link href={'/friends'} className='text-sm text-blue-500 pl-2'>Friends</Link>
          <div className='bg-zinc-800 text-lg text-white rounded-t-lg px-4 py-1'>Find Friends</div>
          <Link href={'/accept-friends'} className='text-sm text-blue-500 pr-2'>Requests</Link>
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
          endMessage={<p className='text-gray-500 text-center mt-3'>No more users to show.</p>}
        >
          {friendsList.map((e) => (
            <div key={e.id || `${e.createdAt}-${e.username}`} className='bg-white z-10 mb-3 p-5 rounded-lg border'>
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
                <button onClick={() => handleFollow(e.id)} className='bg-gradient-to-br from-blue-500 text-sm to-blue-400 py-2 px-3 rounded-full text-white'>
                  Follow
                </button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
