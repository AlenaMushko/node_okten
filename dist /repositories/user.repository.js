"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const models_1 = require("../models");
class UserRepository {
    async findAll() {
        return await models_1.User.find();
    }
    async create(value) {
        return (await models_1.User.create({ ...value }));
    }
    async findById(userId) {
        return (await models_1.User.findById(userId));
    }
    async updateByIdPut(userId, value) {
        return (await models_1.User.findByIdAndUpdate(userId, { ...value }, { new: true }));
    }
    async updateByIdPatch(userId, value) {
        return (await models_1.User.findByIdAndUpdate(userId, { ...value }, { new: true }));
    }
    async deleteById(userId) {
        return (await models_1.User.deleteOne({ _id: userId }));
    }
}
exports.userRepository = new UserRepository();
