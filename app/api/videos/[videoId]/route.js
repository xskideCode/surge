import Video from "@models/video";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const video = await Video.findById(params.videoId).populate('channelId').populate('userId');

    if (!video) return new Response("Video Not Found", { status: 404 });

    return new Response(JSON.stringify(video), { status: 200 });
  } catch (error) {
    return new Response("Error fetching Video", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
      await connectToDB();

      const video = await Video.findById(params.videoId)
      
      if (!video) return new Response("Video Not Found", { status: 404 });
      // Find the prompt by ID and remove it
      await Video.findByIdAndRemove(params.videoId);

      return new Response("Video deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("Error deleting Video", { status: 500 });
  }
};