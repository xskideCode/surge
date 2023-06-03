"use client";

import Category from "@components/Category";
import Loader from "@components/Loader";
import Videos from "@components/videos/Videos";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const VideosPage = () => {
  const { data: session } = useSession();
  const [allVideos, setAllVideos] = useState([]);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1)
 
  const totalPagesRef = useRef(totalPages);
  totalPagesRef.current = totalPages;


  const getCurrentUser = async () => {
    if (session?.user) {
      const response = await fetch(`/api/user/${session.user.id}`);
      const data1 = await response.json();

      setUser(data1);
    }
  };

  useEffect(() => {
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
      setTotalPages(data.numberOfPages);
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

  return (
    <>
      <Category />
      <Videos
        videos={allVideos}
        currentUser={user.length !== 0 ? user : session?.user}
      />
      {loading && <Loader />}
    </>
  );
};

export default VideosPage;
