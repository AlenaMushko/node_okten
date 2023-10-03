"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const models_1 = require("../models");
class AuthRepository {
    async register(body, hashadPassword) {
        return (await models_1.User.create({
            ...body,
            password: hashadPassword,
        }));
    }
    async findOne(email) {
        return (await models_1.User.findOne({ email }));
    }
    async updateUser(id, body) {
        return (await models_1.User.findByIdAndUpdate(id, { ...body }, { new: true }));
    }
}
exports.authRepository = new AuthRepository();
