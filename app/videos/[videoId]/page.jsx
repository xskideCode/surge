import VideoInfo from "@components/videos/VideoInfo";
import VideoRecList from "@components/videos/VideoRecList";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPage = () => {
  const params = useParams()
  const [video, setVideo] = useState({})

  useEffect(() => {
    const getCurrentVideo = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/videos/${params.videoId}`);
        const data = await response.json();
  
        setVideo(data);
        setIsLoading(false);
    };

    getCurrentVideo();
  
  }, []);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <div className="relative pb-[56.25%] w-full ">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${video.videoId}`} className="absolute top-0 left-0" controls width='100%'       height='100%' />
          </div>
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <VideoInfo
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <VideoRecList
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VideoPage;
