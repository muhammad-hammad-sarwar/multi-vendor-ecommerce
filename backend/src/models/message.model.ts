import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversation",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },

    senderModel: {
      type: String,
      enum: ["user", "shop"],
      required: true,
    },

    text: {
      type: String,
      trim: true,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Message = model("message", messageSchema);
