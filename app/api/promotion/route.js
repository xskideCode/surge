import Promotion from "@models/promotion";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const body = await request.json();
  const { channel } = body;

  try {
    await connectToDB();

    // Check if there is an existing promotion
    const existingPromotion = await Promotions.findOne({ channel: channel });
    if (existingPromotion) {
      return {
        statusCode: 400,
        body: "Promotion already exists",
      };
    }

    // Count the documents in the Promotions model
    const promotionCount = await Promotions.countDocuments();
    if (promotionCount >= 15) {
      // Add 'status' key with value 'pending' to the channel object
      channel.status = "pending";

      // Find the promotion with the largest 'expireAt' date
      const largestExpireAtPromotion = await Promotions.findOne().sort({
        expireAt: -1,
      });
      if (largestExpireAtPromotion) {
        const currentDate = new Date();
        const daysToAdd = channel.plan === "3-Day" ? 3 : 7;
        const newExpireAt = new Date(largestExpireAtPromotion.expireAt);
        newExpireAt.setDate(newExpireAt.getDate() + daysToAdd);
        channel.expireAfterSeconds = newExpireAt;
      }
    } else {
      // Add days to expireAfterSeconds based on channel.plan
      const daysToAdd = channel.plan === "3-Day" ? 3 : 7;
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      channel.expireAfterSeconds = currentDate;
    }

    // Find if there are 2 existing promotions with the same userId as channel.userId
    const existingPromotionsCount = await Promotions.countDocuments({
      userId: channel.userId,
    });
    if (existingPromotionsCount >= 2) {
      return {
        statusCode: 400,
        body: "User can only have 2 promotions at a time",
      };
    }

    // Save the channel to the Promotions model
    const newPromotion = new Promotions({ channel });
    await newPromotion.save();

    // Return success response if everything is successful
    return {
      statusCode: 200,
      body: "Promotion created successfully",
    };
  } catch (error) {
    res.status(409).json({ Promotion: error.Promotion });
  }
};
