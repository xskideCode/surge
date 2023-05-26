import { Schema, model, models } from "mongoose";

const ChannelSchema = new Schema({
  channelId: String,
  snippet: {
    title: String,
    description: String,
    customUrl: String,
    publishedAt: String,
    thumbnails: {
      high: {
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

ChannelSchema.post('save', async function (doc) {
  const User = model('User');
  await User.updateOne(
    { _id: doc.userId },
    { $push: { channelIds: doc._id }}
  );
});

// // Define the pre-remove middleware for the ChannelSchema
// ChannelSchema.pre('remove', async function (next) {
//   const User = mongoose.model('User');
  
//   try {
//     // Find the users that have the channel in their channelIds array
//     const users = await User.find({ channelIds: this._id });
    
//     // Update each user by removing the channelId from the channelIds array
//     const updatePromises = users.map(user => {
//       user.channelIds.pull(this._id);
//       return user.save();
//     });

//     await Promise.all(updatePromises);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

UserSchema.pre('remove', { document: false, query: true }, async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  await Video.deleteMany({ channelId: doc._id })
  const User = mongoose.model('User');

  try {
    // Find the users that have the channel in their channelIds array
    const users = await User.find({ channelIds: this._id });
    
    // Update each user by removing the channelId from the channelIds array
    const updatePromises = users.map(user => {
      user.channelIds.pull(this._id);
      return user.save();
    });

    await Promise.all(updatePromises);
    next();
  } catch (error) {
    next(error);
  }
})

const Channel = models.Channel || model("Channel", ChannelSchema);

export default Channel;
