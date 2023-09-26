"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30),
    age: joi_1.default.number().integer().min(0).max(120),
    gender: joi_1.default.string(),
    email: joi_1.default.string().email().regex(constants_1.RegexConstants.EMAIL).required(),
    password: joi_1.default.string().regex(constants_1.RegexConstants.PASSWORD).required(),
});
exports.updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30),
    age: joi_1.default.number().integer().min(0).max(120),
    gender: joi_1.default.string(),
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(3).max(20),
}).or("name", "age", "gender", "email", "password");
