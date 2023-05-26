"use client";

import Button from "@components/Button";
import React, { useState, useEffect } from "react";

import { MdDone } from "react-icons/md";

const Checkout = () => {
  const type = "2";

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [channels, setChannels] = useState(
    JSON.parse(localStorage.getItem("channels"))
  );

  const [selectedChannel, setSelectedChannel] = useState(null);

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };

  function handlePurchaseClick() {
    if (!selectedChannel) {
      alert("Please select a channel.");
      return;
    }

    // show popup with channel details and confirm/cancel button
  }

  return (
    <div className="h-[98vh] overflow-auto scrollbar-none text-white font-poppins mb-4">
      <div className="isolate bg-primary px-6 py-10 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
            Complete Your Purchase
          </h2>
        </div>
        {type === "1" && (
          <div class="pt-24 flex">
            <div class="flex flex-col justify-around w-72 h-[400px] m-auto px-8 pt-9 pb-4 bg-[#27292b] text-center rounded-3xl text-white  shadow-xl border-white transform scale-125 ">
              <h1 class="text-white font-semibold text-2xl">3-Day Plan</h1>
              <div class="bg-[#323537] rounded-lg mx-auto w-3/4 p-4">
                <p class="tracking-wide">
                  <span class="text-gray-400 align-top">$ </span>
                  <span class="text-3xl font-semibold">1.5</span>
                  <span class="text-gray-400 font-light "> USD</span>
                </p>
              </div>
              <hr class="mt-2 border-1 border-gray-600" />
              {channels && (
                <div className="grid justify-center bg-[#212325] rounded-[20px] mt-4 w-42 h-30 overflow-auto scrollbar-thin">
                  <span class="text-gray-400 font-light text-xs m-2">
                    Select channel
                  </span>
                  {channels?.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => handleChannelClick(channel)}
                      className="flex items-center flex-row h-12 my-2 p-1 rounded-lg hover:bg-[#323537] overflow-x-auto scrollbar-thin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-slate-900"
                    >
                      <img
                        src={channel.snippet.thumbnails.default.url}
                        alt={channel.snippet.title}
                        className="rounded-full h-[36px] w-[36px] hover:scale-125 cursor-pointer mr-3  "
                      />

                      <div className="flex flex-col ">
                        <h4 className="font-poppins font-semibold text-xs text-white">
                          {channel.snippet.title}
                        </h4>
                        <div className="flex flex-row ">
                          <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">
                            {channel.snippet.customUrl}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <p class="flex flex-row gap-1 items-center font-semibold text-gray-400 text-left ml-2 mb-4">
                <MdDone />
                <span class="text-white pl-1">3</span> Day promotion
              </p>
              <Button label={"Purchase"} />
              <div class="absolute top-3 right-4">
                <p class="bg-purple-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                  Popular
                </p>
              </div>
            </div>
          </div>
        )}
        {type === "2" && (
          <div class="pt-24 flex">
            <div class="flex flex-col justify-around w-72 h-[400px] m-auto p-8 bg-[#27292b] text-center rounded-3xl text-white  shadow-xl border-white transform scale-125 ">
              <h1 class="text-white font-semibold text-2xl">Weekly Plan</h1>
              <div class="bg-[#323537] rounded-lg mx-auto w-3/4 p-4">
                <p class="tracking-wide">
                  <span class="text-gray-400 align-top">$ </span>
                  <span class="text-3xl font-semibold">3.0</span>
                  <span class="text-gray-400 font-light "> USD</span>
                </p>
              </div>
              <hr class="mt-2 border-1 border-gray-600" />
              {channels && (
                <div className="grid justify-center bg-[#212325] rounded-[20px] mt-4 w-42 h-30 overflow-auto scrollbar-thin">
                  <span class="text-gray-400 font-light text-xs m-2">
                    Select channel
                  </span>
                  {channels?.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => handleChannelClick(channel)}
                      className="flex items-center flex-row h-12 my-2 p-1 rounded-lg hover:bg-[#323537] overflow-x-auto scrollbar-thin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-slate-900"
                    >
                      <img
                        src={channel.snippet.thumbnails.default.url}
                        alt={channel.snippet.title}
                        className="rounded-full h-[36px] w-[36px] hover:scale-125 cursor-pointer mr-3  "
                      />

                      <div className="flex flex-col ">
                        <h4 className="font-poppins font-semibold text-xs text-white">
                          {channel.snippet.title}
                        </h4>
                        <div className="flex flex-row ">
                          <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">
                            {channel.snippet.customUrl}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <p class="flex flex-row gap-1 items-center font-semibold text-gray-400 text-left ml-2 mb-4">
                <MdDone />
                <span class="text-white pl-1">7</span> Day promotion
              </p>
              <Button label={"Purchase"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
