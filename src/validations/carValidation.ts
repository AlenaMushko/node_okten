import Joi from "joi";

const currentYear = new Date().getFullYear();

export class carSchema {
  static model = Joi.string().min(3).max(30).messages({
    "string.base": `"model" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });
  static year = Joi.number().integer().min(1995).max(currentYear).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}}  must be at least {{#limit}} year",
    "string.max": "{{#label}} must be less than or equal to {{#limit}} year",
  });

  static price = Joi.number().integer().min(1).max(1000000).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static create = Joi.object({
    model: this.model.required(),
    year: this.year.required(),
    price: this.price.required(),
  });

  static updateCarSchema = Joi.object({
    model: this.model,
    year: this.year,
    price: this.price,
  }).or("model", "year", "price");
}
