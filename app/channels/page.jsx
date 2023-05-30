'use client';

import Channels from "@components/channels/Channels";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const ChannelsPage = () => {
  const { data: session } = useSession();
  const [allChannels, setAllChannels] = useState([]);
  const [user, setUser] = useState([]);


  const fetchChannels = async () => {
    const response = await fetch("/api/channels");
    const data = await response.json();

    setAllChannels(data);
  };

  const getCurrentUser = async () => {
    if (session?.user) {
      const response = await fetch(`/api/user/${session.user.id}`);
      const data1 = await response.json();

      setUser(data1);
    }
  };

  useEffect(() => {
    fetchChannels();
    getCurrentUser();
  }, []);

  return (
    <>
      <Channels channels={allChannels} currentUser={user}/>
    </>
  );
};

export default ChannelsPage;