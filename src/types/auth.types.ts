import { ObjectId } from "mongoose";

export interface IMessage {
  message: string;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokenPayload {
  id: ObjectId;
}
