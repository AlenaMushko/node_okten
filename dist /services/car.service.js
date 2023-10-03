"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const repositories_1 = require("../repositories");
class CarService {
    async getAll() {
        return await repositories_1.carRepository.getAll();
    }
    async getAllOwner(id) {
        return await repositories_1.carRepository.getAllOwner(id);
    }
    async create(value) {
        return await repositories_1.carRepository.create(value);
    }
    async updateByIdPut(id, value) {
        return await repositories_1.carRepository.updateByIdPut(id, value);
    }
    async updateByIdPatch(id, value) {
        return await repositories_1.carRepository.updateByIdPatch(id, value);
    }
    async deleteById(id) {
        return await repositories_1.carRepository.deleteById(id);
    }
}
exports.carService = new CarService();
