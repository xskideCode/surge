import Channel from "@models/channel";
import User from "@models/user";
import Video from "@models/video";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) return new Response("User Not Found", { status: 404 });

    const channels = await Channel.find({ _id: user.channelIds});

    const videos = await Video.find({ _id: { $in: channels.map(channel => channel.videoIds) }});

    const newUser = {
      ...user.toObject(),
      channels,
      videos
    };

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const body = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    console.log(existingUser);
    console.log(body);

    let userInfo = Object.keys(body).map((key) => {
      if (body[key].trim().length !== 0) {
        if (key.startsWith("name")) {
          existingUser.username = body[key];
        } else {
          existingUser[key] = body[key];
        }
      } else if (
        key === "instagram" ||
        key === "facebook" ||
        key === "tiktok" ||
        key === "twitter"
      ) {
        existingUser[key] = body[key].trim();
      }
    });

    console.log(existingUser);

    await existingUser.save();

    return new Response("Successfully updated the User", { status: 200 });
  } catch (error) {
    return new Response("Error Updating User", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await User.findByIdAndRemove(params.id);

    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting User", { status: 500 });
  }
};
