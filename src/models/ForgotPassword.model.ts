import { model, Schema, Types } from "mongoose";

import { IActivated } from "../types";
import { User } from "./User.model";

const forgotPasswordSchema = new Schema(
  {
    accessToken: {
      type: String,
      default: "",
      required: true,
    },
    _userId: {
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

export const ForgotPassword = model<IActivated>(
  "forgotPassword",
  forgotPasswordSchema,
);
