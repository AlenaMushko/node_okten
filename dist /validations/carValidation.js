"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const currentYear = new Date().getFullYear();
class carSchema {
}
exports.carSchema = carSchema;
_a = carSchema;
carSchema.model = joi_1.default.string().min(3).max(30).messages({
    "string.base": `"model" should be a type of 'text'`,
    "string.min": "{{#label}} length must be at least {{#limit}} characters long",
    "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long",
});
carSchema.year = joi_1.default.number().integer().min(1995).max(currentYear).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}}  must be at least {{#limit}} year",
    "string.max": "{{#label}} must be less than or equal to {{#limit}} year",
});
carSchema.price = joi_1.default.number().integer().min(1).max(1000000).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
});
carSchema.ownerId = joi_1.default.string();
carSchema.create = joi_1.default.object({
    model: _a.model.required(),
    year: _a.year.required(),
    price: _a.price.required(),
    ownerId: _a.ownerId,
});
carSchema.updateCarSchema = joi_1.default.object({
    model: _a.model,
    year: _a.year,
    price: _a.price,
    ownerId: _a.ownerId,
}).or("model", "year", "price", "ownerId");
