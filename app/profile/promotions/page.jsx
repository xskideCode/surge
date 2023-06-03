'use client';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

import PromotionsTable from "@components/profile/promotionsTable"

const UserPromotions = () => {
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
    router.prefetch('/profile/content');  

    getCurrentUser();
  
  }, [session?.user, status, session, router.pathname]);

  return (
    <div className='flex flex-col gap-8 w-[90vw] overflow-x-auto scrollbar-none  justify-center p-4'>
       <div>
        <PromotionsTable promotions={user.promotions} />
       </div>
    </div>
  )
}

export default UserPromotions