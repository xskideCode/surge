'use client';

import Container from '@components/Container';
import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import { useSession } from 'next-auth/react';

const VideoRecList = ({ data }) => {
  const { data: session } = useSession();
  const [allVideos, setAllVideos] = useState([])
  const [user, setUser] = useState([]);
  
  const fetchVideos = async () => {
    const response = await fetch("/api/videos");
    const data = await response.json();
    
    setAllVideos(data);
  };

  const getCurrentUser = async () => {
    if (session?.user) {
      const response = await fetch(`/api/user/${session.user.id}`);
      const data1 = await response.json();

      setUser(data1);
    }
  };

  useEffect(() => {
    fetchVideos();
    getCurrentUser();
  }, []);
  
  const recommendedVideos = allVideos.filter(({ _id }) => _id !== data?._id);

  return (
      <div
        className="
            pt-2
            grid 
            grid-cols-1
            gap-8
          "
      >
        {recommendedVideos.map((video) => (
          <VideoCard
            currentUser={user}
            key={video.id}
            data={video}
            flexRow
          />
        ))}
      </div>
  )
}

export default VideoRecList