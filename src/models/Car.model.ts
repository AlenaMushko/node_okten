import { model, Schema, Types } from "mongoose";

import { ICar } from "../types";
import { User } from "./User.model";

const currentYear = new Date().getFullYear();

const carSchema = new Schema(
  {
    model: {
      type: String,
      min: [3, "Name min 3 symbols"],
      max: [30, "Name max 20 symbols"],
    },
    year: {
      type: Number,
      min: [1995, "Year min 1995"],
      max: [currentYear, `Year max ${currentYear}`],
    },
    price: {
      type: Number,
      min: [1, "Price min 1"],
      max: [1000000, "Price max 1000000"],
    },
    _ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<ICar>("car", carSchema);
