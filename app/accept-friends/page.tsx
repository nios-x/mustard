'use client';

import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFriendRequests = useCallback(async () => {
    try {
      const response = await fetch(`/api/public/friends/accept-request?page=${page}`);
      const data = await response.json();
        console.log(data)
      if (data?.friendRequests?.length > 0) {
        setFriendRequests((prev) => [...prev, ...data.friendRequests]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      toast.error('Failed to load friend requests.');
    }
  }, [page]);

  useEffect(()=>{
    fetchFriendRequests()
  },[])
  const handleAccept = async (friendId: string) => {
    try {
      const response = await fetch('/api/public/friends/accept-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId }),
      });

      const data = await response.json();
      
      if (data.count == 1) {
        toast.success('Friend request accepted');
        
        setFriendRequests(friendRequests => friendRequests.filter((req) => req.id !== friendId));
      }
    } catch (error) {
      toast.error('Failed to accept request.');
    }
  };

  return (
    <div>
      <Toaster />
      <Heading>
        <div className='text-2xl mt-3 text-zinc-600 pt-5  '>
          <div className='px-2 pt-2 bg-zinc-200 rounded-t-md flex  items-baseline gap-x-4'>

          <Link href={'/friends'} className='text-sm pl-2 text-blue-500'>Friends</Link>
          <Link href={'/find-friends'} className='text-sm text-blue-500'>Find Friends</Link>
          <div className='bg-zinc-800 text-lg text-white rounded-t-lg px-4 py-1'>Requests</div>
          </div>
        </div>
      </Heading>
      <div className='w-full h-[0.6px] mb-4 bg-zinc-300'></div>
      <div className='px-3'>
        <InfiniteScroll
          dataLength={friendRequests.length}
          next={fetchFriendRequests}
          hasMore={hasMore}
          loader={<h4 className='mt-8 text-sm  text-center'>Loading...</h4>}
          endMessage={<p className='text-gray-500 text-center mt-3'>No more friend requests.</p>}
        >
          {friendRequests.map((req) => (
            <div key={req.id} className='bg-white z-10 mb-3 p-5 rounded-lg border'>
              <div className='flex items-center space-x-3'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/035/727/704/non_2x/3d-realistic-person-or-people-user-social-network-icon-3d-rendering-illustration-vector.jpg'
                  alt='User Avatar'
                  className='w-10 h-10 rounded-full border'
                />
                <div>
                  <div className='font-semibold text-lg'>{req.userR1.name}</div>
                  <div className='text-gray-500 text-sm'>@{req.userR1.username}</div>
                </div>
              </div>
              <div className='mt-2 text-gray-400 text-xs'>
              </div>
              <div className='flex justify-end'>
                <Button onClick={() => handleAccept(req.userR1.id)} className='bg-green-500 text-white py-2 px-3 rounded-full'>
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
