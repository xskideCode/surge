'use client';

import ClientOnly from "@components/ClientOnly";
import EmptyState from "@components/EmptyState";
import Loader from "@components/Loader";
import Channels from "@components/channels/Channels";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useRef, useState } from "react";


const ChannelsPage = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const pathname = usePathname();
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

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      page: 1,
    };

    const url = qs.stringifyUrl(
      {
        url: "/api/channels",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setTimeout(async () => {
      const response = await fetch(url);
      const data = await response.json();

      setAllChannels(data.data);
      setTotalPages(data.numberOfPages);
    }, 1500);
  }, [params, hasMounted]);

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      const response = await fetch(
        `/api${pathname}?${params.toString()}&page=${page}`
      );
      const data = await response.json();

      setAllChannels((prev) => {
        return [...prev, ...data.data];
      });
      setTotalPages(data.numberOfPages);
      setLoading(false);
    }, 1000);
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

  if (!allChannels || allChannels.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset loading={loading} />
      </ClientOnly>
    );
  }

  return (
    <>
      <Channels channels={allChannels} currentUser={user}/>
      {loading && <Loader />}
    </>
  );
};

export default ChannelsPage;