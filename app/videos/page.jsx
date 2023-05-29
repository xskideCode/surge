'use client';

import Category from "@components/Category";
import Videos from "@components/videos/Videos";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const VideosPage = () => {
  const { data: session } = useSession();
  const [allVideos, setAllVideos] = useState([]);
  const [user, setUser] = useState([]);


  const fetchVideos = async () => {
    const response = await fetch("/api/video");
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

  return (
    <>
    <Category />
      <Videos videos={allVideos} currentUser={(user.length !== 0) ? user : session?.user}/>
    </>
  );
};

export default VideosPage;