import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(0).max(120).required(),
  country: Joi.string().min(2).max(30).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: Joi.number().integer().min(0).max(120),
  country: Joi.string().min(2).max(30),
}).or("name", "age", "country");

export { updateUserSchema, userSchema };
