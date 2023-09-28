"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordService {
    async hash(password) {
        return await bcrypt_1.default.hash(password, 7);
    }
}
exports.passwordService = new PasswordService();
