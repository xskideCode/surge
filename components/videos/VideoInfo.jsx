'use client';

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import { socialMedia } from "@components/profile/userInfo";
import { shortenNumber } from "@components/profile/channelsTable";
import React, { useCallback, useEffect, useState } from "react";
import { MdCheckCircle, MdOutlineThumbUp, MdThumbUp } from "react-icons/md";
import Socials from "@components/home/Socials";
import { useRouter } from "next/navigation";
import LikeButton from "@components/LikeButton";
import useLike from "@hooks/useLike";
 
const VideoInfo = ({ data, user, channel, currentUser  }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const userId = currentUser?._id || currentUser?.id

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const { hasLiked, likeCount, toggleLike } = useLike({
    userId,
    currentVideo: data
  });

  const [displayedLikeCount, setDisplayedLikeCount] = useState(0);

  useEffect(() => {
    if (data && data.likes) {
      setDisplayedLikeCount(data.likes.length);
    }
  }, [data]);

  useEffect(() => {
    setDisplayedLikeCount(likeCount);
  }, [likeCount]);

  return (
    <div className="flex flex-col">
      <div className="line-clamp-2 font-semibold text-lg text-ellipsis overflow-hidden max-h-12 mb-2">
        {data?.snippet?.title}
      </div>
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row gap-2">
          <div onClick={() => router.push(`/channels/${channel?._id}`)} className="cursor-pointer">
            <Avatar
              medium
              src={
                channel?.snippet.thumbnails?.high?.url ||
                channel?.snippet.thumbnails?.medium?.url ||
                channel?.snippet.thumbnails?.default?.url
              }
            />
          </div>
          <div
            className="
              flex
              flex-col
              items-start
              line-clamp-1
              text-ellipsis
              overflow-hidden
              max-h-12
              "
          >
            <div onClick={() => router.push(`/channels/${channel?._id}`)} className="flex flex-row font-semibold items-center gap-1 cursor-pointer">
              {channel?.snippet?.title}
              <MdCheckCircle className="text-neutral-200" />
            </div>
            <div className="text-xs font-light">
              {shortenNumber(channel?.statistics.subscriberCount)}{" "}
              {data?.statistics?.viewCount === "1" ? "subscriber" : "subscribers"}
            </div>
          </div>
          <div className="transition duration-200 ring-opacity-50 rounded-md hover:ring-2 hover:ring-gray-400 my-auto ml-3">
            <Button
              label={"Subscribe"}
              small
              outline
              onClick={() => {
                const url = `https://www.youtube.com/channel/${channel.channelId}?sub_confirmation=1`;
                window.open(url, "_blank");
              }}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          {/* Like */}
          <div
            onClick={toggleLike}
            className="flex flex-row h-8 items-center bg-zinc-800 px-2 gap-2 text-sm rounded-lg">
            <LikeButton currentVideo={data} userId={currentUser?._id || currentUser?.id} hasLiked={hasLiked} />
            {shortenNumber(displayedLikeCount)}
          </div>
          {/* Dropdown */}
          <div className="relative inline-block">
            {/* Dropdown toggle button */}
            <button
              onClick={toggleDropdown}
              className="relative z-10 block p-2 border border-transparent rounded-md text-white bg-zinc-800 transition duration-200 hover:ring-2 ring-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                onClick={() => setIsOpen(false)}
                className="absolute right-0 z-20 w-45 pt-3 mt-2 origin-top-right text-xs rounded-md shadow-xl bg-zinc-800"
              >    <div className="font-semibold whitespace-nowrap px-2 mb-3 text-gray-300 hover:text-white cursor-default">Follow user</div>            
                  {socialMedia.map((social) => (
                    <div className="flex justify-center mx-6 mb-3">
                      <Socials
                        key={social.id}
                        icon={social.icon}
                        label={social.id}
                        link={social.link}
                        user={user}
                      />
                    </div>
                  ))}                
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="
          flex
          flex-col
          bg-zinc-800
          rounded-lg
          text-xs
          p-2
        "
      >
        <div className="flex gap-1">
          {shortenNumber(data?.statistics?.viewCount)}{" "}
          {data?.statistics?.viewCount === "1" ? "view" : "views"}
          <span>•</span>
          {data?.updatedAt ? new Date(data?.updatedAt).toDateString() : ""}
        </div>

        <div className="line-clamp-3">{data?.snippet?.description}</div>
      </div>
    </div>
  );
};

export default VideoInfo;
