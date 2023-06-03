'use client';

import Container from '@components/Container';
import React, { useEffect, useRef, useState } from 'react'
import VideoCard from './VideoCard';
import { useSession } from 'next-auth/react';
import Loader from '@components/Loader';

const VideoRecList = ({ data }) => {
  const { data: session } = useSession();
  const [allVideos, setAllVideos] = useState([])
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1)
 
  const totalPagesRef = useRef(totalPages);
  totalPagesRef.current = totalPages;
  
  // const fetchVideos = async () => {
  //   const response = await fetch("/api/videos");
  //   const data = await response.json();
    
  //   setAllVideos(data.data);
  // };

  const getCurrentUser = async () => {
    if (session?.user) {
      const response = await fetch(`/api/user/${session.user.id}`);
      const data1 = await response.json();

      setUser(data1);
    }
  };

  useEffect(() => {
    //fetchVideos();
    getCurrentUser();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      const response = await fetch(`/api/videos?page=${page}`);
      const data = await response.json();

      setAllVideos((prev) => {
        return [...prev, ...data.data];
      });
      setTotalPages(Math.min(data.numberOfPages, 2));
      setLoading(false);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      page < totalPagesRef.current &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      
      setPage((prev) => {
        const nextPage = prev + 1;
        return nextPage <= totalPagesRef.current ? nextPage : prev;
      });
    }
  };
  
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
        {loading && <Loader small />}
      </div>
  )
}

export default VideoRecList