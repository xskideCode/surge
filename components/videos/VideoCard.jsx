import Avatar from "@components/Avatar";
import LikeButton from "@components/LikeButton";
import Thumbnail from "@components/Thumbnail";
import { shortenNumber } from "@components/profile/channelsTable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { MdCheckCircle } from "react-icons/md";

const VideoCard = ({ data, currentUser, flexRow }) => {
  const router = useRouter();
  return (
    <div
      className="col-span-1 "
    >
      <div className={`flex gap-2 max-w-fit ${flexRow ? 'flex-row' : 'flex-col'}`}>
        <div
          onClick={() => router.push(`/videos/${data?._id}`)}
          className={`
          aspect-video 
          w-full  
          rounded-xl
          cursor-pointer
          ${flexRow ? 'max-w-[117px] sm:max-w-[170px] md:max-w-[129px]' : ''}
        `}
        >
          <Thumbnail large src={data?.snippet?.thumbnails?.maxres?.url || data?.snippet?.thumbnails?.medium?.url || data?.snippet?.thumbnails?.default?.url} />
          
        </div>
        <div className="grid grid-cols-7 grid-rows-2 font-semibold text-lg gap-2 relative">
          <div className={`row-span-2 justify-self-center cursor-pointer ${flexRow ? 'hidden' : ''}`}>
          <Avatar  medium onClick={() => router.push(`/channels/${data?.channelId?._id}`)}  src={data.channelId?.snippet?.thumbnails.medium.url} />
          </div>
          <div 
            className={`
              text-xs              
              row-span-2
              ${flexRow ? '' : 'max-w-[220px] xs:text-sm'}
              ${flexRow ? 'col-span-7' : 'col-span-5'}
            `}
          >
           <div 
              onClick={() => router.push(`/videos/${data?._id}`)} 
              className="
                line-clamp-2
                text-ellipsis
                overflow-hidden
                max-h-12
                cursor-pointer
              "
            >
              {data?.snippet?.title}
            </div>
            <div className="font-light text-neutral-400">
              <div onClick={() => router.push(`/channels/${data?.channelId?._id}`)} className="flex flex-row gap-1 items-center text-neutral-200 cursor-pointer">
                {data?.snippet?.channelTitle} 
                <MdCheckCircle />
              </div>
              {shortenNumber(data?.statistics?.viewCount)} {data?.statistics?.viewCount === '1' ? 'view' : 'views'}
              <span className="mx-1">•</span>
              {shortenNumber(data?.likes?.length)} {data?.likes?.length === 1 ? 'like' : 'likes'}
            </div>
          </div>
          <div
            className={`
              absolute
              top-4
              right-4
              sm:right-3
              ${flexRow ? 'hidden' : '' }
            `}
          >
            <LikeButton currentVideo={data} userId={currentUser?._id || currentUser?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
