'use client';

import ChannelCard from '@components/channels/ChannelCard';
import Socials from '@components/home/Socials';
import { socialMedia } from '@components/profile/userInfo';
import Videos from '@components/videos/Videos';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ChannelPage = () => {
  const params = useParams()
  const { data: session } = useSession();
  const [allVideos, setAllVideos] = useState([]);
  const [user, setUser] = useState([]);
  const [channel, setChannel] = useState({})
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getCurrentChannel = async () => {
      if (channel) {
        const response = await fetch(`/api/channels/${params.channelId}`);
        const data = await response.json();
  
        setChannel(data);
        setAllVideos(data.videos);
        console.log(data);
      }
    };
    const getCurrentUser = async () => {
      if (session?.user) {
        const response = await fetch(`/api/user/${session.user.id}`);
        const data1 = await response.json();
  
        setUser(data1);
      }
    };

    getCurrentChannel();
    getCurrentUser();
  
  }, []);

  return ( 
    <div className=''>
      <div className='absolute overflow-clip h-[160px] w-full left-0 -z-10'>
        <Image 
          src={'/assets/images/banner3.png'}
          height={`150`}
          width={`1280`}
        />
      </div>
      <div className='relative flex flex-row justify-between items-center mt-24 xs:mt-28 sm:mt-40 '>
        <ChannelCard 
          data={channel}
          page
        />
        {/* Dropdown */}
        <div className="absolute xs:relative xs:top-0 xs:right-0 top-8 right-5 inline-block">
            {/* Dropdown toggle button */}
            <button
              onClick={toggleDropdown}
              className="relative z-10 block p-2 border border-transparent rounded-md text-white xs:bg-zinc-800 transition duration-200 hover:ring-2 ring-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                onClick={() => setIsOpen(false)}
                className="absolute right-0 z-20 w-45 pt-3 mt-2 origin-top-right text-xs rounded-md shadow-xl bg-zinc-800"
              >    <div className="font-semibold whitespace-nowrap px-2 mb-3 text-gray-300 hover:text-white cursor-default">Follow user</div>            
                  {socialMedia.map((social) => (
                    <div className="flex justify-center mx-6 mb-3">
                      <Socials
                        key={social.id}
                        icon={social.icon}
                        label={social.id}
                        link={social.link}
                        user={channel.userId}
                      />
                    </div>
                  ))}                
              </div>
            )}
          </div>
      </div>
      <hr className='border-zinc-600'/>
      <div>
        <Videos videos={allVideos} currentUser={user}/>
      </div>
    </div>
  )
}

export default ChannelPage