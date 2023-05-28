import Avatar from "@components/Avatar";
import LikeButton from "@components/LikeButton";
import Thumbnail from "@components/Thumbnail";
import Image from "next/image";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const VideoCard = ({ data, currentUser}) => {
  console.log(data)
  return (
    <div
      onClick={() => router.push(`/videos/${data?._id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-video 
          w-full 
          relative 
          rounded-xl
        "
        >
          <Thumbnail large src={data.snippet.thumbnails.maxres.url} />
          <div
            className="
          absolute
          -bottom-12
          right-3
        "
          >
            <LikeButton listingId={data._id} currentUser={currentUser} />
          </div>
        </div>

        <div className="grid grid-cols-7 grid-rows-2 font-semibold text-lg gap-2">
          <div className="row-span-2 justify-self-center">
          <Avatar large medium  src={data.channelId.snippet.thumbnails.medium.url} />
          </div>
          <div className=" col-span-5 row-span-2">
            <div className="flex flex-row items-center gap-4 text-ellipsis overflow-hidden max-h-14">
              {data.snippet.title}
            </div>
            <div className="text-sm font-light text-neutral-400">
              <div className="flex flex-row gap-1 items-center text-neutral-200">
                {data.snippet.channelTitle} 
                <AiFillCheckCircle />
              </div>
              {data.statistics.viewCount} views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
