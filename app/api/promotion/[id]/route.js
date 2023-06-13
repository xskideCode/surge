import Promotion from "@models/promotion";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// Define constants for magic numbers
const MAX_PROMOTIONS = 15;
const THREE_DAY_S = 3 * 60;
const SEVEN_DAY_S = 7 * 60;
// const THREE_DAY_S = 3 * 24 * 60 * 60;
// const SEVEN_DAY_S = 7 * 24 * 60 * 60;

export const POST = async (request) => {
  const body = await request.json();
  const promotionData = body;

  try {
    await connectToDB();

    // Get promotion count and latest promotion date
    const promotionCount = await Promotion.countDocuments();
    let latestPromoDate;
    if (promotionCount >= MAX_PROMOTIONS) {
      promotionData.status = "pending";
      latestPromoDate = await getLatestPromoDate();
    }

    // Calculate expireAfterSeconds
    let expireAfterSeconds;
    if (latestPromoDate) {
      expireAfterSeconds = calculateExpireAfterSeconds(
        latestPromoDate,
        promotionData.plan
      );
    } else {
      expireAfterSeconds =
        promotionData.plan === "3-Day" ? THREE_DAY_S : SEVEN_DAY_S;
    }

    
     // Create new promotion
     const newPromotion = new Promotion({
      ...promotionData,
      expireAt: new Date(Date.now() + expireAfterSeconds * 1000),
    });
    
    // Save new promotion
    await newPromotion.save();

    // Add promotion to user
    const user = await User.findOne({ _id: promotionData.userId });
    if (user) {
      user.promotions.push(newPromotion);
      await user.save();
    } else {
      return new Response("User not found.", { status: 404 });
    }

    return new Response("Promotions created successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 409 });
  }
};


// Helper function to get the latest promo date
async function getLatestPromoDate() {
  const latestPromo = await Promotion.findOne()
    .sort({
      expireAt: -1,
    })
    .limit(1);
  return latestPromo ? latestPromo.expireAt : null;
}

// Helper function to calculate expireAfterSeconds
function calculateExpireAfterSeconds(latestPromoDate, plan) {
  const currentDate = new Date();
  const secondsToAdd = plan === "3-Day" ? THREE_DAY_S : SEVEN_DAY_S;
  const futureDate = new Date(latestPromoDate.getTime() - currentDate.getTime());
  return (futureDate.getTime() + secondsToAdd) ;
}