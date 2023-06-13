import { Schema, model, models } from "mongoose";

const expireAfterSeconds = 21 * 24 * 60 * 60;

const PromotionSchema = new Schema(
  {
    snippet: {
      title: String,
      description: String,
      customUrl: String,
      publishedAt: String,
      thumbnails: {
        default: {
          url: String,
          width: Number,
          height: Number,
        },
        high: {
          url: String,
          width: Number,
          height: Number,
        },
        medium: {
          url: String,
          width: Number,
          height: Number,
        },
      },
    },
    statistics: {
      viewCount: String,
      subscriberCount: String,
      hiddenSubscriberCount: Boolean,
      videoCount: String,
    },
    channelId: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    plan: {
      type: String,
    },
    status: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: expireAfterSeconds },
    },
  },
  { timestamps: true }
);

const Promotion = models.Promotion || model("Promotion", PromotionSchema);

export default Promotion;
