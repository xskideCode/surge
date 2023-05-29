import Video from "@models/video";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  
  
  try {
    const existingVideo = await Video.findById(params.videoId);
    

    if (!existingVideo) return new Response("No video with that Id", { status : 404 });

    const video = existingVideo;

    const index = video.likes.findIndex((id) => id === String(params.userId));

    if (index === -1) {
      video.likes.push(params.userId);
    } else {
      video.likes = video.likes.filter((id) => id !== String(params.userId));
    }

    const updatedVideo = await Video.findByIdAndUpdate(params.videoId, video, {
      new: true,
    });

    return NextResponse.json(updatedVideo);
    
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
