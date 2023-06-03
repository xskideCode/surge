"use client";

import Button from "@components/Button";
import CheckoutModal from "@components/modals/CheckoutModal";
import useCheckoutModal from "@hooks/useCheckoutModal";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { MdDone } from "react-icons/md";

const Checkout = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const checkoutModal = useCheckoutModal();

  const [channels, setChannels] = useState([]);

  const [selectedChannel, setSelectedChannel] = useState(null);

  const getCurrentUser = async () => {
    if (session?.user) {
      const response = await fetch(`/api/user/${session.user.id}`);
      const data = await response.json();

      setUser(data);
      setChannels(data.channels);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleChannelClick = (channel) => {
    // setSelectedChannel(channel);
    // selectedChannel.plan = plan;
    setSelectedChannel({ ...channel, plan });
  };

  function handlePurchaseClick() {
    if (!selectedChannel) {
      toast.error("Please select a channel.", {
        style: { background: "#333", color: "#fff" },
      });
      return;
    }
    // show popup with channel details and confirm/cancel button
    checkoutModal.onOpen();
    
  }

  return (
    <div className="h-[98vh] overflow-auto scrollbar-none text-white font-poppins mb-4">
      <div className="isolate bg-primary px-6 py-10 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
            Complete Your Purchase
          </h2>
        </div>
        {plan === "3-Day" && (
          <div className="pt-24 flex">
            <div className="flex flex-col justify-around w-72 h-[400px] m-auto px-8 pt-9 pb-4 bg-[#27292b] text-center rounded-3xl text-white  shadow-xl border-white transform scale-125 ">
              <h1 className="text-white font-semibold text-2xl">3-Day Plan</h1>
              <div className="bg-[#323537] rounded-lg mx-auto w-3/4 p-4">
                <p className="tracking-wide">
                  <span className="text-gray-400 align-top">$ </span>
                  <span className="text-3xl font-semibold">1.5</span>
                  <span className="text-gray-400 font-light "> USD</span>
                </p>
              </div>
              <hr className="mt-2 border-1 border-gray-600" />
              {channels && (
                <div className="grid justify-center bg-[#212325] rounded-[20px] pb-4 mt-4 w-42 h-30 overflow-auto scrollbar-thin">
                  <span className="text-gray-400 font-light text-xs m-2">
                    Select channel
                  </span>
                  {channels?.map((channel) => (
                    <label
                      key={channel.id}
                      className={`
                      flex
                      items-center
                      flex-row
                      h-12
                      my-2
                      px-2
                      p-1
                      rounded-lg
                      hover:bg-[#323537]
                      overflow-x-auto
                      scrollbar-thin
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-gray-500
                      hover:outline-none
                      hover:ring-2
                      hover:ring-offset-2
                      hover:ring-gray-500
                      ring-offset-slate-900
                      transition
                      duration-200
                      ${
                        selectedChannel === channel
                          ? "outline-none ring-2 ring-offset-2 ring-gray-500 ring-offset-slate-900"
                          : ""
                      }
                    `}
                    >
                      <input
                        type="radio"
                        name="channel"
                        value={channel.id}
                        checked={selectedChannel === channel} 
                        onChange={() => handleChannelClick(channel)}
                        className="hidden"
                      />
                      <img
                        src={channel?.snippet?.thumbnails?.high?.url || channel?.snippet?.thumbnails?.medium?.url || channel?.snippet?.thumbnails?.default?.url}
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
                    </label>
                  ))}
                </div>
              )}
              <p className="flex flex-row gap-1 items-center font-semibold text-gray-400 text-left ml-2 mb-4">
                <MdDone />
                <span className="text-white pl-1">3</span> Day promotion
              </p>
              <Button label={"Purchase"} onClick={handlePurchaseClick} />
              <div className="absolute top-3 right-4">
                <p className="bg-purple-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                  Popular
                </p>
              </div>
            </div>
          </div>
        )}
        {plan === "Weekly" && (
          <div className="pt-24 flex">
            <div className="flex flex-col justify-around w-72 h-[400px] m-auto p-8 bg-[#27292b] text-center rounded-3xl text-white  shadow-xl border-white transform scale-125 ">
              <h1 className="text-white font-semibold text-2xl">Weekly Plan</h1>
              <div className="bg-[#323537] rounded-lg mx-auto w-3/4 p-4">
                <p className="tracking-wide">
                  <span className="text-gray-400 align-top">$ </span>
                  <span className="text-3xl font-semibold">3.0</span>
                  <span className="text-gray-400 font-light "> USD</span>
                </p>
              </div>
              <hr className="mt-2 border-1 border-gray-600" />
              {channels && (
                <div className="grid justify-center bg-[#212325] rounded-[20px] pb-4 mt-4 w-42 h-30 overflow-auto scrollbar-thin">
                  <span className="text-gray-400 font-light text-xs m-2">
                    Select channel
                  </span>
                  {channels?.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => handleChannelClick(channel)}
                      className="flex items-center flex-row h-12 my-2 px-2 p-1 rounded-lg hover:bg-[#323537] overflow-x-auto scrollbar-thin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-slate-900"
                    >
                      <img
                        src={channel?.snippet?.thumbnails?.high?.url || channel?.snippet?.thumbnails?.medium?.url || channel?.snippet?.thumbnails?.default?.url}
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
              <p className="flex flex-row gap-1 items-center font-semibold text-gray-400 text-left ml-2 mb-4">
                <MdDone />
                <span className="text-white pl-1">7</span> Day promotion
              </p>
              <Button label={"Purchase"} onClick={handlePurchaseClick} />
            </div>
          </div>
        )}
      </div>
      {selectedChannel && (
        <CheckoutModal channel={selectedChannel} />
      )}
    </div>
  );
};

export default Checkout;
