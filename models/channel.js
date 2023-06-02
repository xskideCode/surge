import { Schema, model, models } from "mongoose";

const ChannelSchema = new Schema({
  channelId: String,
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
  topicDetails: {
    topicCategories: Array,
    topicIds: Array,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  videoIds: {
       type: [] 
  },
},
{ timestamps: true }
);


const Channel = models.Channel || model("Channel", ChannelSchema);

export default Channel;
