"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const repositories_1 = require("../repositories");
class UserService {
    async findAll() {
        return await repositories_1.userRepository.findAll();
    }
    async create(value) {
        return await repositories_1.userRepository.create(value);
    }
    async updateByIdPut(userId, value) {
        return await repositories_1.userRepository.updateByIdPut(userId, value);
    }
    async updateByIdPatch(userId, value) {
        return await repositories_1.userRepository.updateByIdPatch(userId, value);
    }
    async deleteById(userId) {
        return await repositories_1.userRepository.deleteById(userId);
    }
}
exports.userService = new UserService();
