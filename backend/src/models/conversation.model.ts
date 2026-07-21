import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

conversationSchema.index({ seller: 1, user: 1 }, { unique: true });
export const Conversation = mongoose.model("conversation", conversationSchema);
