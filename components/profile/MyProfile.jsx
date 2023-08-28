"use client";

import Button from "@components/Button";
import UserInfo from "@components/profile/userInfo";
import useChannelModal from "@hooks/useChannelModal";
import useSocialsModal from "@hooks/useSocialsModal";
import useUserInfoModal from "@hooks/useUserInfoModal";
import useVideoModal from "@hooks/useVideoModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const channelModal = useChannelModal();
  const videoModal = useVideoModal();
  const userInfoModal = useUserInfoModal();
  const socialsModal = useSocialsModal();
  

  const [user, setUser] = useState({});  
  const [isLoading, setIsLoading] = useState(false);  
    
  useEffect(() => {
    const visibilityHandler = () => document.visibilityState === "visible" && update()
    window.addEventListener("visibilitychange", visibilityHandler, false)
    return () => window.removeEventListener("visibilitychange", visibilityHandler, false)
  }, [update])

  useEffect(() => {
    const getCurrentUser = async () => {
      if (session?.user) {
        setIsLoading(true);
        const response = await fetch(`/api/user/${session.user.id}`);
        const data = await response.json();
  
        setUser(data);
        setIsLoading(false);
      }
    };
    console.log(status)
 
    router.prefetch('/profile/content');
    router.prefetch('/profile/promotions');

    getCurrentUser();
  
  }, [session, status, userInfoModal.isOpen, socialsModal.isOpen]);
  

  return (
    <div className="grid sm:grid-cols-2 justify-items-center content-center grid-flow-row mt-4 mb-8 px-2 gap-6">
      {/* User Details */}
      <div className=" px-2 sm:px-0 row-span-6 ">
        <UserInfo status={status} user={user} isLoading={isLoading} />
      </div>
      {/* Add Channel & Video Prompt */}
      <div className="row-span-2 ">
        <div className="flex flex-col items-center min-w-[250px] sm:w-80 md:w-96 p-4 overflow-hidden bg-zinc-800 gap-4 shadow rounded-2xl ">
         
          <Button 
            label={'Add Channel'}
            outline
            onClick={() => {channelModal.onOpen(); }}
          />
          <Button 
            label={'Add Video'}
            onClick={() => {videoModal.onOpen(); }}            
          />
        </div>
      </div>
      {/* Promotion Prompt */}
      <div className="row-span-3">
        <div className="grid grid-rows-2 gap-2 sm:w-[20rem] md:w-[29rem] w-90% overflow-hidden shadow rounded-3xl">
          <div className="grid grid-cols-3 grid-flow-row bg-zinc-800 gap-2 p-6">
            <div className="my-auto col-span-3 ">Basic Plan</div>
            <div className=" col-span-2">
              <h4 className="text-2xl sm:text-3xl font-poppins font-semibold tracking-wide">
                $ 3 <span className="text-sm sm:text-base text-gray-500">for 3 Days</span>
              </h4>
            </div>
            <div className="md:w-[100px] hover:scale-110">
              <Button
                label={'Coming Soon'}
                //onClick={() => router.push('/checkout?plan=3-Day')}
                small
              />
            </div>
          </div>
          <div className="grid grid-cols-3 grid-flow-row bg-zinc-800 gap-2 p-6">
            <div className="my-auto col-span-3 ">Weekly Plan</div>
            <div className=" col-span-2">
              <h4 className="text-2xl sm:text-3xl font-poppins font-semibold tracking-wide">
                $ 10 <span className="text-sm sm:text-base text-gray-500">for 7 Days</span>
              </h4>
            </div>
            <div className=" md:w-[100px] hover:scale-110">
              <Button
                label={'Coming Soon'}
                //onClick={() => router.push('/checkout?plan=Weekly')}
                small
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
