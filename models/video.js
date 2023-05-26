import { Schema, model, models } from "mongoose";

const VideoSchema = new Schema({
  videoId: String,
  snippet: {
    title: String,
    channelTitle: String,
    channelId: String,
    categoryId: { type: String, default: "0" },
    description: String,
    customUrl: String,
    publishedAt: String,
    tags: [String],
    thumbnails: {
      maxres: {
        url: String,
        width: Number,
        height: Number,
      },
    },
  },
  statistics: {
    viewCount: String,
    likeCount: String,
    commentCount: Boolean,
    favoriteCount: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
  },
  likes: {
    type: [String],
    default: [],
  },
},
{ timestamps: true }
);

VideoSchema.post('save', async function (doc) {
  const Channel = model('Channel');
  await Channel.updateOne(
    { _id: doc.channelId },
    { $push: { videoIds: doc._id }}
  );
});

// Define the pre-remove middleware for the VideoSchema
VideoSchema.pre('remove', async function (next) {
  const Channel = mongoose.model('Channel');
  
  try {
    // Find the channels that have the video in their videoIds array
    const channels = await Channel.find({ videoIds: this._id });
    
    // Update each channel by removing the videoId from the videoIds array
    const updatePromises = channels.map(channel => {
      channel.videoIds.pull(this._id);
      return channel.save();
    });

    await Promise.all(updatePromises);
    next();
  } catch (error) {
    next(error);
  }
});

const Video = models.Video || model("Video", VideoSchema);

export default Video;
