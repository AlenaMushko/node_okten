import Joi from "joi";

import { RegexConstants } from "../constants";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: Joi.number().integer().min(0).max(120),
  gender: Joi.string(),
  email: Joi.string().email().regex(RegexConstants.EMAIL).required(),
  password: Joi.string().regex(RegexConstants.PASSWORD).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: Joi.number().integer().min(0).max(120),
  gender: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(3).max(20),
}).or("name", "age", "gender", "email", "password");
