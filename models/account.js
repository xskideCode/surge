import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
    provider: {
      type: String,
    },
    providerAccountId: {
      type: String,
    },
    refresh_token: {
      type: Schema.Types.String,
    },
    access_token: {
      type: Schema.Types.String,
    },
    expires_at: {
      type: Number,
    },
    token_type: {
      type: String,
    },
    scope: {
      type: String,
    },
    id_token: {
      type: Schema.Types.String,
    },
    session_state: {
      type: String,
    },
  },
  { timestamps: true }
);

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = models.Account || model("Account", AccountSchema);

export default Account;
