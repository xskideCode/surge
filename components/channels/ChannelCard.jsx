import Avatar from "@components/Avatar";
import Button from "@components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { shortenNumber } from "@components/profile/channelsTable";
import { MdCheckCircle } from "react-icons/md";


const ChannelCard = ({ data, currentUser}) => {
  const router = useRouter();
  return (
    <div
      className="col-span-1 cursor-pointer group bg-zinc-800 mb-8 sm:mb-0 pt-5 p-4 rounded-md"
    >
      <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
        <div onClick={() => router.push(`/channels/${data?._id}`)}>
          <Avatar xl src={data.snippet.thumbnails?.high?.url || data.snippet.thumbnails?.medium?.url || data.snippet.thumbnails?.default?.url} />
        </div>

        <div onClick={() => router.push(`/channels/${data?._id}`)} className="sm:gap-2 w-full">
          <div className=" flex flex-col items-center sm:items-start gap-1">
            <div className=" flex flex-row gap-1 items-center line-clamp-2 text-ellipsis overflow-hidden max-h-12">
              {data.snippet.title}
              <MdCheckCircle className="text-neutral-200" />
            </div>
            <div className="flex flex-row gap-1 text-sm items-center text-neutral-400">
              {data.snippet.customUrl} 
              <span>•</span>
              {shortenNumber(data.statistics.subscriberCount)} {data?.statistics.subscriberCount === '1' ? 'subscriber' : 'subscribers'}
            </div>
            <div className="pl-3 sm:pl-0 text-sm font-light sm:max-w-screen-xs text-ellipsis line-clamp-2 text-neutral-400">
              {data.snippet.description}
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
