'use client';

import Loader from "@components/Loader";
import Channels from "@components/channels/Channels";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";


const ChannelsPage = () => {
  const { data: session } = useSession();
  const [allChannels, setAllChannels] = useState([]);
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
      const response = await fetch(`/api/channels?page=${page}`);
      const data = await response.json();

      setAllChannels((prev) => {
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
      <Channels channels={allChannels} currentUser={user}/>
      {loading && <Loader />}
    </>
  );
};

export default ChannelsPage;