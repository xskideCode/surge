'use client';

import VideoInfo from "@components/videos/VideoInfo";
import VideoRecList from "@components/videos/VideoRecList";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPage = () => {
  const params = useParams()
  const { data: session } = useSession();
  const [video, setVideo] = useState({})  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCurrentVideo = async () => {
      if (video) {
        setIsLoading(true);
        const response = await fetch(`/api/videos/${params.videoId}`);
        const data = await response.json();
  
        setVideo(data);
        setIsLoading(false);
      }
    };

    getCurrentVideo();
  
  }, []);

  return (
      <div
        className="
          max-w-screen-xl
          mx-auto
          w-full
        "
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="sticky aspect-video ">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${video.videoId}`} className="" controls width='100%'       height='100%' />
          </div>
          <div
            className="
              grid 
              grid-cols-3 
              md:grid-cols-7
              gap-2
            "
          >
            <div
              className="
              col-span-3
              md:col-span-4
              lg:col-span-5
              "
            >
              <VideoInfo
                data={video}
                user={video.userId}
                channel={video.channelId}
                currentUser={session?.user}
              />
            </div>
            <div
              className="
                col-span-3
                md:col-span-3
                lg:col-span-2
              "
            >
              <VideoRecList
                data={video}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default VideoPage;
