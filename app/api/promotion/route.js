import Promotion from "@models/promotion";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// Define constants for magic numbers
const MAX_USER_PROMOTIONS = 2;

export const GET = async (request) => {
  try {
      await connectToDB()

      const promotions = await Promotion.find({}).populate('userId')

      return new Response(JSON.stringify(promotions), { status: 200 })
  } catch (error) {
      throw new Error("Failed to fetch all promotions", { status: 400 })
  }
} 

export const POST = async (request) => {
  const body = await request.json();
  const channel = body;

  try {
    await connectToDB();

    if (!channel.plan) {
      return new Response("Plan missing", { status: 400 });
    }

    const existingPromotion = await Promotion.findOne({
      channelId: channel.channelId,
    });

    if (existingPromotion) {
      return new Response("Promotion already exists", { status: 400 });
    }    

    const existingPromotionsCount = await Promotion.countDocuments({
      userId: channel.userId,
    });

    if (existingPromotionsCount >= MAX_USER_PROMOTIONS) {
      return new Response("User can only have 2 promotions at a time", {
        status: 400,
      });
    }

    
    const user = await User.findOne({ _id: channel.userId });

    if (!user) {
      return new Response("User not found.", { status: 404 });
    }
    

    return new Response("Promotions can be created successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 409 });
  }
};
