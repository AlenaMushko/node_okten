"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
class userSchema {
}
exports.userSchema = userSchema;
_a = userSchema;
userSchema.userName = joi_1.default.string().min(3).max(30).messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.min": "{{#label}} length must be at least {{#limit}} characters long",
    "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long",
});
userSchema.age = joi_1.default.number().integer().min(0).max(120).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} length must be at least {{#limit}} characters long",
    "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long",
});
userSchema.gender = joi_1.default.string().valid("male", "female").messages({
    "any.only": "{{#label}} must be either 'male' or 'female'",
});
userSchema.email = joi_1.default.string().email().regex(constants_1.RegexConstants.EMAIL).messages({
    "string.email": "{{#label}} must be a valid email",
    "any.required": "{{#label}} is required!!",
    "string.pattern.base": "{{#label}} should start with alphanumeric, underscores, dots, or hyphens, followed by '@', then alphanumeric, dots or hyphens, and end with 2 to 4 alphabet characters.",
});
userSchema.password = joi_1.default.string().regex(constants_1.RegexConstants.PASSWORD).messages({
    "string.pattern.base": "{{#label}} must be 3 to 20 characters, contain at least one lowercase letter, one uppercase letter, and one number.",
    "any.required": "{{#label}} is required!!",
});
userSchema.create = joi_1.default.object({
    name: _a.userName.required(),
    age: _a.age,
    gender: _a.gender,
    email: _a.email.required(),
    password: _a.password.required(),
});
userSchema.updateUserSchema = joi_1.default.object({
    name: _a.userName,
    age: _a.age,
    gender: _a.gender,
    email: _a.email,
    password: _a.password,
}).or("name", "age", "gender", "email", "password");
userSchema.login = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
