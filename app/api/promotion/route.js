import Promotion from "@models/promotion";
import User from "@models/user";
import { connectToDB } from "@utils/database";

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

    const promotionCount = await Promotion.countDocuments();
    if (promotionCount >= 15) {
      channel.status = "pending";

      var latestPromoDate = await Promotion.findOne()
        .sort({
          expireAt: -1,
        })
        .limit(1)[0].expireAt;
      if (latestPromoDate) {
        var currentDate = new Date();
        const millisecondsToAdd =
          channel.plan === "3-Day"
            ? 3 * 24 * 60 * 60 * 1000
            : 7 * 24 * 60 * 60 * 1000;
        var futureDate = new Date(
          latestPromoDate.getTime() - currentDate.getTime()
        );
        var expireAfterSeconds =
          (futureDate.getTime() + millisecondsToAdd) / 1000;
      }
      console.log("more than 15 promos");
    } else {
      const millisecondsToAdd =
        channel.plan === "3-Day"
          ? 3 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000;
      var expireAfterSeconds = millisecondsToAdd / 1000;
    }

    const existingPromotionsCount = await Promotion.countDocuments({
      userId: channel.userId,
    });

    if (existingPromotionsCount >= 2) {
      return new Response("User can only have 2 promotions at a time", {
        status: 400,
      });
    }

    
    const newPromotion = new Promotion({
      ...channel,
      createdAt: new Date().toISOString(),
      expireAt: new Date(Date.now() + expireAfterSeconds * 1000).toISOString(),
    });
    
    const user = await User.findOne({ _id: channel.userId });

    await newPromotion.save();

    if (user) {
      user.promotions.push(newPromotion);
      await user.save(); // Save the changes to the user document
    } else {
      return new Response("User not found.", { status: 404 });
    }
    

    return new Response("Promotions created successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 409 });
  }
};
