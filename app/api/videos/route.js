import Video from "@models/video";
import { connectToDB } from "@utils/database";
import Channel from "@models/channel";
import User from "@models/user";

export const GET = async (request) => {
  try {
    await connectToDB();

    const videos = await Video.find({}).populate("channelId");

    return new Response(JSON.stringify(videos), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all videos", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const { svideo } = body;

  try {
    await connectToDB();

    for (const item of svideo) {
      try {
        if (
          typeof item === "object" &&
          item !== null &&
          item.hasOwnProperty("id")
        ) {
          const existingVideo = await Video.findOne({ videoId: item.id });

          if (existingVideo)
            return new Response("Video already exist.", { status: 400 });

          const user = await User.findOne({ _id: item.userId });

          const channel = await Channel.findOne({
            channelId: item.snippet.channelId,
          });

          if (!channel)
            return new Response(
              "No corresponding channel found. Add the video's channel first",
              { status: 400 }
            );

          if (!user.channelIds.includes(channel._id))
            return new Response(
              "Attention! The video you uploaded does not match any of your registered channels.",
              { status: 400 }
            );

          console.log(channel);

          const video = new Video({
            videoId: item.id,
            snippet: item.snippet,
            statistics: item.statistics,
            userId: item.userId,
            channelId: channel._id,
          });

          const newVideo = await Video.create(video);

          if (channel) {
            channel.videoIds.push(newVideo._id); // Push the new Video's _id to the Channel's VideoId array
            await channel.save(); // Save the changes to the Channel document
          } else {
            return new Response("Channel not found.", { status: 404 });
          }
        }
      } catch (error) {
        return new Response(error.message, { status: error.status });
      }
    }

    if (svideo.length < 1)
      return new Response("Invalid Video", { status: 500 });

    return new Response("Successfully created the Video", { status: 201 });
  } catch (error) {
    return new Response("Failed to save Video", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const body = await request.json();
  const { svideo } = body;

  for (const item of svideo) {
    try {
      await connectToDB();

      if (
        typeof item === "object" &&
        item !== null &&
        item.hasOwnProperty("id")
      ) {
        // Find the existing prompt by ID
        const existingVideo = await Video.findOne({ videoId: item.id });

        if (!existingVideo) {
          return new Response("Video not found", { status: 404 });
        }

        // Update the prompt with new data

        const updatedVideo = await Video.findOneAndUpdate(
          { videoId: item.id },
          { snippet: item.snippet, statistics: item.statistics },
          { new: true }
        );

        return new Response("Successfully updated the Video", { status: 200 });
      }
    } catch (error) {
      return new Response("Error Updating Video", { status: 500 });
    }
  }
};
