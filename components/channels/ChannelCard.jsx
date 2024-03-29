import Avatar from "@components/Avatar";
import Button from "@components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { shortenNumber } from "@components/profile/channelsTable";
import { MdCheckCircle } from "react-icons/md";


const ChannelCard = ({ data, page }) => {
  const router = useRouter();
  return (
    <div
      className={`
        col-span-1
        sm:mb-0
        pt-5
        p-4
        rounded-md
        ${page ? 'bg-transparent mb-2 w-[85vw] xs:w-auto' : 'bg-zinc-800 mb-8 lg:w-full'} 
      `}
    >
      <div 
        className={`
          flex          
          sm:flex-row
          w-full
          gap-2          
          items-center
          ${page ? 'flex-col xs:flex-row ' : 'flex-col'}
        `}
      >
        <div onClick={() => router.push(`/channels/${data?._id}`)} className="cursor-pointer">
          <Avatar large={page ? true : false} xl={page ? false : true} src={data?.snippet?.thumbnails?.high?.url || data?.snippet?.thumbnails?.medium?.url || data?.snippet?.thumbnails?.default?.url} />
        </div>

        <div onClick={() => router.push(`/channels/${data?._id}`)} className="sm:gap-2 w-full cursor-pointer">
          <div 
            className={`
              flex
              flex-col
              sm:items-start
              gap-1
              ${page ? 'items-center text-sm' : 'items-center'}
            `}
          >
            <div className=" flex flex-row gap-1 items-center line-clamp-2 text-ellipsis overflow-hidden max-h-12">
              {data?.snippet?.title}
              <MdCheckCircle className="text-neutral-200" />
            </div>
            <div 
              className={`
                flex
                flex-row
                flex-wrap
                gap-1
                items-center
                justify-center
                text-neutral-400
                ${page ? 'text-xs' : 'text-sm'}
              `}
            >
             {data?.snippet?.customUrl}
              <span>•</span>
              <span className=" whitespace-nowrap">
              {shortenNumber(data?.statistics?.subscriberCount)} {data?.statistics?.subscriberCount === '1' ? 'subscriber' : 'subscribers'}</span>
            </div>
            <div 
              className={`                
                sm:pl-0
                font-light
                sm:max-w-screen-xs
                text-ellipsis
                line-clamp-2
                text-neutral-400
                ${page ? 'text-xs' : 'text-sm'}
                ${page ? 'sm:pr-4' : 'pl-3'}
              `}
              title={data?.snippet?.description}
            >
              {data?.snippet?.description}
            </div>
          </div>
        </div>
        <div className="transition duration-200 ring-opacity-50 rounded-md hover:ring-2 hover:ring-gray-400">
        <Button
          label={'Subscribe'}
          small
          red
          onClick={() => {
            const url = `https://www.youtube.com/channel/${data.channelId}?sub_confirmation=1`;
            window.open(url, '_blank');
          }}
        />
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
