
import Channel from '@models/channel';
import { connectToDB } from '@utils/database';
import User from '@models/user';

export const GET = async (request) => {
  const query = request.nextUrl.searchParams;
  const page = query.get('page');

  try {
    await connectToDB();

    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Channel.countDocuments({});

    const channels = await Channel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex).populate("userId");


    return new Response(JSON.stringify({ data: channels, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) }), { status: 200 });

  } catch (error) {
      throw new Error("Failed to fetch all channels", { status: 400 })
  }
} 


export const POST = async (request) => {
  const body = await request.json();
  const { schannel } = body;
  

  try {
    await connectToDB();    

    for (const item of schannel) {
      try {        
      
        if (typeof item === 'object' && item !== null && item.hasOwnProperty('id')) {


          const existingChannel = await Channel.findOne({ channelId: item.id });      
      
          if(existingChannel)  return new Response("Channel already exist.", { status: 400 });

          const channel = new Channel({ channelId: item.id, snippet: item.snippet, statistics: item.statistics , topicDetails: item.topicDetails, userId: item.userId });
          
          const newChannel = await Channel.create(channel); 
          
          const user = await User.findOne({ _id: item.userId });

          if (user) {
            user.channelIds.push(newChannel._id); // Push the new channel's _id to the user's channelId array
            await user.save(); // Save the changes to the user document
          } else {
            return new Response("User not found.", { status: 404 });
          }
        }
      } catch (error) {
        return new Response("Invalid channel received", { status: 500 });
      }
    };

    
    return new Response("Successfully created the Channel", { status: 201 });

  } catch (error) {
    return new Response("Failed to register user", { status: 500 }); 
  }
}

export const PATCH = async (request, { params }) => {
  const body = await request.json();
  const { schannel } = body;

  for (const item of schannel) {
    try {
      await connectToDB();

      if (
        typeof item === "object" &&
        item !== null &&
        item.hasOwnProperty("id")
      ) {
        // Find the existing prompt by ID
        const existingChannel = await Channel.findOne({ channelId: item.id });

        if (!existingChannel) {
          return new Response("Channel not found", { status: 404 });
        }

        // Update the prompt with new data

        const updatedChannel = await Channel.findOneAndUpdate(
          { channelId: item.id },
          { snippet: item.snippet, statistics: item.statistics, topicDetails: item.topicDetails },
          { new: true }
        );

        return new Response("Successfully updated the Channel", { status: 200 });
      }
    } catch (error) {
      return new Response("Error Updating Channel", { status: 500 });
    }
  }
};