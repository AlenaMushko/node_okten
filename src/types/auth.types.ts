import { ObjectId } from "mongoose";

import { IUser } from "./user.type";

export interface IMessage {
  message: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokenPayload {
  id: ObjectId;
}

export interface ITokensPair {
  userId: ObjectId;
  name: string;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends IJwt, Document {
  _id: ObjectId;
  _userId: ObjectId | IUser;
}
