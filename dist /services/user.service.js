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
    async updateByIdPut(id, value) {
        return await repositories_1.userRepository.updateByIdPut(id, value);
    }
    async updateByIdPatch(id, value) {
        return await repositories_1.userRepository.updateByIdPatch(id, value);
    }
    async deleteById(id) {
        return await repositories_1.userRepository.deleteById(id);
    }
}
exports.userService = new UserService();
