
import Video from '@models/video';
import { connectToDB } from '@utils/database';
import Channel from '@models/channel';
import User from '@models/user';

export const GET = async (request) => {
  try {
      await connectToDB()

      const videos = await Video.find({}).populate('channelId')

      return new Response(JSON.stringify(videos), { status: 200 })
  } catch (error) {
      throw new Error("Failed to fetch all videos", { status: 400 })
  }
} 

export const POST = async (request) => {
  const body = await request.json();
  const { svideo } = body;
  

  try {
    await connectToDB();
    

    svideo.map(async (item) => {
      if (typeof item === 'object' && item !== null && item.hasOwnProperty('id')) {
       


        const existingVideo = await Video.findOne({ videoId: item.id });

        if(existingVideo)  throw new Error("Video already exist.", { status: 400 });

        const user = await User.findOne({ _id: item.userId });

        const channel = await Channel.findOne({ channelId: item.snippet.channelId });
        
        if(!channel)  throw new Error("Invalid video. No corresponding channel found. Add the video's channel first", { status: 400 });
        
        if(!user.channelIds.includes(channel._id))  throw new Error("Attention! The video you uploaded does not match any of your registered channels.", { status: 400 });
        
        console.log(channel);

        const video = new Video({ videoId: item.id, snippet: item.snippet, statistics: item.statistics , userId: item.userId, channelId: channel._id });
        
        const newVideo = await Video.create(video); 

        if (channel) {
          channel.videoIds.push(newVideo._id); // Push the new Video's _id to the Channel's VideoId array
          await channel.save(); // Save the changes to the Channel document
        } else {
          throw new Error("Channel not found.", { status: 404 });
        }


      } else {
        throw new Error("Invalid Video received", { status: 500 });
      }
    });
    
    return new Response("Successfully created the Video", { status: 201 });

  } catch (error) {
    return new Response("Failed to save Video", { status: 500 }); 
  }
}