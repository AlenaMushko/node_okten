import { model, Schema } from "mongoose";

import { IActivated } from "../types";

const activatedSchema = new Schema(
  {
    accessToken: {
      type: String,
      default: "",
      required: true,
    },
    userEmail: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Activated = model<IActivated>("activated", activatedSchema);
