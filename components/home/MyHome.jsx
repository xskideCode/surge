"use client";

import Link from "next/link";

import Hero from "./Hero";
import Promoted from "./Promoted";
import Community from "./Community";
import CTA from "./CTA";
import Category from "@components/Category";
import Videos from "@components/videos/Videos";
import VideosPage from "@app/videos/page";

const MyHome = () => {
  return (
    <>
      <div className="bg-primary flex_center">
        <div className="box_width">
          <Hero />
        </div>
      </div>
      <div className="bg-primary flex_center ">
        <div className="box_width">
        <Promoted />
            <div className=" sm:max-h-[750px] max-h-[1090px] mx-4 overflow-clip">
              <VideosPage />
              {/* <div
                className="
                  pt-24
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  2xl:grid-cols-6
                  gap-8
                "
              >
              
              </div> */}
            </div>
            <div class="relative flex py-5 items-center opacity-50 hover:opacity-90">
              <div class="flex-grow border-t border-gray-400"></div>
              <Link href="/videos">
                <span class="flex-shrink mx-4 text-gray-400">View More</span>
              </Link>
              <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <Community />
            <CTA />
          </div>
      </div>
      
      {/* <div className="bg-primary flex_start">
          <div className="box_width">
            <Promoted />
            <Categories />
            <div className=" sm:max-h-[750px] max-h-[1090px] mx-4 overflow-clip">
              <div
                className="
                  pt-24
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  2xl:grid-cols-6
                  gap-8
                "
              >
              
              </div>
            </div>
            <div class="relative flex py-5 items-center opacity-50 hover:opacity-90">
              <div class="flex-grow border-t border-gray-400"></div>
              <Link href="/videos">
                <span class="flex-shrink mx-4 text-gray-400">View More</span>
              </Link>
              <div class="flex-grow border-t border-gray-400"></div>
            </div>
            <Community />
            <CTA />
          </div>
      </div> */}
    </>
  );
};

export default MyHome;
