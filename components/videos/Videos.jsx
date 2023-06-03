'use client';

import React from "react";
import VideoCard from "./VideoCard";
import Container from "@components/Container";

const Videos = ({ videos , currentUser }) => {
  return (
    <Container>
      <div
        className="
            pt-14
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-6
            gap-8
          "
      >
        {videos.map((video) => (
          <VideoCard
            currentUser={currentUser}
            key={video._id}
            data={video}
          />
        ))}
      </div>
    </Container>
  );
};

export default Videos;
