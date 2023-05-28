
import Channel from '@models/channel';
import { connectToDB } from '@utils/database';
import User from '@models/user';


export const POST = async (request) => {
  const body = await request.json();
  const { schannel } = body;
  

  try {
    await connectToDB();


    

    schannel.map(async (item) => {
      if (typeof item === 'object' && item !== null && item.hasOwnProperty('id')) {


        const existingChannel = await Channel.findOne({ channelId: item.id });
    
    
        if(existingChannel)  return new Response("Channel already exist.", { status: 400 });

        const channel = new Channel({ channelId: item.id, snippet: item.snippet, statistics: item.statistics , userId: item.userId });
        
        const newChannel = await Channel.create(channel); 
         
        const user = await User.findOne({ _id: item.userId });

        if (user) {
          user.channelIds.push(newChannel._id); // Push the new channel's _id to the user's channelId array
          await user.save(); // Save the changes to the user document
        } else {
          return new Response("User not found.", { status: 404 });
        }


      } else {
        return new Response("No valid channel received", { status: 500 });
      }
    });

    
    return new Response("Successfully created the Channel", { status: 201 });

  } catch (error) {
    return new Response("Failed to register user", { status: 500 }); 
  }
}