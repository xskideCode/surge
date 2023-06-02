import Channel from "@models/channel";
import User from "@models/user";
import Video from "@models/video";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const channel = await Channel.findById(params.channelId).populate("userId");

    if (!channel) return new Response("Channel Not Found", { status: 404 });

    const videos = await Video.find({ _id: channel.videoIds })
      .populate("channelId")
      .populate("userId");

    const newChannel = {
      ...channel.toObject(),
      videos,
    };

    return new Response(JSON.stringify(newChannel), { status: 200 });
  } catch (error) {
    return new Response("Error fetching Channel", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const channel = await Channel.findById(params.channelId);

    if (!channel) return new Response("Channel Not Found", { status: 404 });

    await Video.deleteMany({ channelId: params.channelId });

    const users = await User.find({ channelIds: new mongoose.Types.ObjectId(params.channelId) });
     
    for (const user of users) {
      const index = user.channelIds.indexOf(params.channelId);
      if (index !== -1) {
        user.channelIds.splice(index, 1);
        user.markModified('channelIds');
        await user.save();
      }
    }

    // Find the prompt by ID and remove it "Error deleting channel"
    await Channel.findByIdAndRemove(params.channelId);

    return new Response("Channel deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
