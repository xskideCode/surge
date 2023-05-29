import Avatar from "@components/Avatar";
import LikeButton from "@components/LikeButton";
import Thumbnail from "@components/Thumbnail";
import { shortenNumber } from "@components/profile/channelsTable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { MdCheckCircle } from "react-icons/md";

const VideoCard = ({ data, currentUser}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/videos/${data?._id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 max-w-fit">
        <div
          className="
          aspect-video 
          w-full 
          relative 
          rounded-xl
        "
        >
          <Thumbnail large src={data.snippet.thumbnails?.maxres?.url || data.snippet.thumbnails?.medium?.url || data.snippet.thumbnails?.default?.url} />
          <div
            className="
          absolute
          -bottom-12
          right-5
          sm:right-3
        "
          >
            <LikeButton listingId={data._id} currentUser={currentUser} />
          </div>
        </div>

        <div className="grid grid-cols-7 grid-rows-2 font-semibold text-lg gap-2">
          <div className="row-span-2 justify-self-center ">
          <Avatar  medium  src={data.channelId.snippet.thumbnails.medium.url} />
          </div>
          <div className=" col-span-5 row-span-2 max-w-[220px]">
            <div className="text-sm line-clamp-2 text-ellipsis overflow-hidden max-h-12">
              {data.snippet.title}
            </div>
            <div className="text-sm font-light text-neutral-400">
              <div className="flex flex-row gap-1 items-center text-neutral-200">
                {data.snippet.channelTitle} 
                <MdCheckCircle />
              </div>
              {shortenNumber(data.statistics.viewCount)} {data?.statistics.viewCount === '1' ? 'view' : 'views'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
