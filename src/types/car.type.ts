import { Document } from "mongoose";

export interface ICar extends Document {
  model: string;
  year: number;
  price: number;
  ownerId: string;
  img: string | string[];
}
