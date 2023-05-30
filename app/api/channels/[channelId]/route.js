import Channel from "@models/channel";
import Video from "@models/video";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const channel = await Channel.findById(params.channelId).populate('userId');

    if (!channel) return new Response("Channel Not Found", { status: 404 });

    const videos = await Video.find({ _id: channel.videoIds}).populate('channelId').populate('userId');

    const newChannel = {
      ...channel.toObject(),
      videos
    };


    return new Response(JSON.stringify(newChannel), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};