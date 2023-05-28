'use client';

import Button from '@components/Button'
import ChannelsTable from '@components/profile/channelsTable'
import VideosTable from '@components/profile/videosTable'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const UserContent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [channels, setChannels] = useState([])
  const [videos, setVideos] = useState([]);
  const [userId, setUserId] = useState('');  

  useEffect(() => {
    const getCurrentUser = async () => {
      if (session?.user) {
        const response = await fetch(`/api/user/${session.user.id}`);
        const data1 = await response.json();
  
        setUser(data1);
        setChannels(data1.channels);
        setVideos(data1.videos);
      } else {
        setUserId(JSON.parse(sessionStorage.getItem("userId")))
        
        const response = await fetch(`/api/user/${userId}`);
        const data1 = await response.json();
  
        setUser(data1);        
        setChannels(data1.channels);
        setVideos(data1.videos);
      }
    };
 
    router.prefetch('/profile');
    router.prefetch('/profile/promotions');  

    getCurrentUser();
  
  }, [session?.user, session, router.pathname]);



  return (
    <div className='flex flex-col gap-8 w-[90vw] overflow-x-auto scrollbar-none  justify-center p-4'>
       <div>
        <ChannelsTable channels={channels} />
       </div>
       <hr class="my-2 border-gray-600"/>
       <div>
        <VideosTable videos={videos} />
       </div>
    </div>
  )
}

export default UserContent