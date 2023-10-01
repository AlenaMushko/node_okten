import { model, Schema } from "mongoose";

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
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      // //з якої колекції беремо юзера
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model("car", carSchema);
