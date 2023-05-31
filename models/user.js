import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      match: [
        /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/,
        "Username invalid, it should contain 3-20 alphanumeric letters and be unique!",
      ],
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: false,
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    channelIds: {
      type: [],
    },
    promotions: [
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
        channelId: String,
        status: String,
        plan: String,
        createdAt: Date,
        expireAt: Date,
      },
    ],
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    facebook: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter());
    await Account.deleteMany({ userId: doc._id });
    await Channel.deleteMany({ userId: doc._id });
    await Video.deleteMany({ userId: doc._id });
  }
);

const User = models.User || model("User", UserSchema);

export default User;
