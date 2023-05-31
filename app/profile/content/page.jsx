'use client';

import ChannelsTable from '@components/profile/channelsTable'
import VideosTable from '@components/profile/videosTable'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const UserContent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getCurrentUser = async () => {
      if (session?.user) {
        const response = await fetch(`/api/user/${session.user.id}`);
        const data1 = await response.json();
  
        setUser(data1);
      } 
    };
 
    router.prefetch('/profile');
    router.prefetch('/profile/promotions');  

    getCurrentUser();
  
  }, [session?.user, status, session, router.pathname]);



  return (
    <div className='flex flex-col gap-8 w-[90vw] overflow-x-auto scrollbar-none  justify-center p-4'>
       <div>
        <ChannelsTable channels={user.channels} />
       </div>
       <hr class="my-2 border-gray-600"/>
       <div>
        <VideosTable videos={user.videos} />
       </div>
    </div>
  )
}

export default UserContent