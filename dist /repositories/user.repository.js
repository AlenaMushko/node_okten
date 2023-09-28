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
    async findById(id) {
        return (await models_1.User.findById(id));
    }
    async updateByIdPut(id, value) {
        return (await models_1.User.findByIdAndUpdate(id, { ...value }, { new: true }));
    }
    async updateByIdPatch(id, value) {
        return (await models_1.User.findByIdAndUpdate(id, { ...value }, { new: true }));
    }
    async deleteById(id) {
        return (await models_1.User.deleteOne({ _id: id }));
    }
}
exports.userRepository = new UserRepository();
