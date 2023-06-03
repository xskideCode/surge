"use client";

import { MdCheckCircle } from "react-icons/md";
import Link from "next/link";

import Avatar from "@components/Avatar";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const Promoted = () => {
  const [allPromotions, setAllPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPromtions = async () => {
    setIsLoading(true);
    const response = await fetch("/api/promotion");
    const data = await response.json();

    setAllPromotions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPromtions();
  }, []);

  return (
    <section className="flex_center padding_y flex-col">
      <div className="flex flex-row justify-center items-center py-[3px] px-4 bg-discount-gradient rounded-[10px] mb-2 ">
        <p className="font-poppins font-normal text-dimWhite xs:text-[18px] text-[12px] m-2 text-center">
          <span className="  text-gray-200">PROMOTED CHANNELS</span>
        </p>
      </div>
      <div className="flex flex-row items-center py-[6px] px-2 bg-discount-gradient rounded-[10px] mb-2 w-11/12 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center w-full">
            <Loader small />
          </div>
        ) : (
          allPromotions.map((promotion) => (
            <div key={promotion._id} className="flex flex-row justify-center px-5 py-1 ">
              <div className="flex flex-col items-center group cursor-pointer max-w-[80px]">
                <div
                  onClick={() => {
                    const url = `https://www.youtube.com/channel/${promotion.channelId}?sub_confirmation=1`;
                    window.open(url, "_blank");
                  }}
                  className="flex flex-col justify-center items-center"
                >
                  <Avatar lmd src={promotion?.snippet?.thumbnails?.high?.url} />
                  <h6 title={promotion?.snippet?.title} className="px-auto my-1 whitespace-nowrap truncate font-poppins font-semibold xs:text-[14px] text-[12px]">
                    {promotion?.snippet?.title}{" "}
                    <MdCheckCircle className="inline text-zinc-400" />
                  </h6>
                </div>
                <button
                  type="button"
                  className="py-1 px-2 bg-red-600 font-poppins font-semibold text-[12px] text-white outline-none rounded-md"
                  onClick={() => {
                    const url = `https://www.youtube.com/channel/${promotion.channelId}?sub_confirmation=1`;
                    window.open(url, "_blank");
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Promoted;
