"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    age: joi_1.default.number().integer().min(0).max(120).required(),
    country: joi_1.default.string().min(2).max(30).required()
});
exports.userSchema = userSchema;
const updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30),
    age: joi_1.default.number().integer().min(0).max(120),
    country: joi_1.default.string().min(2).max(30)
}).or("name", "age", "country");
exports.updateUserSchema = updateUserSchema;
