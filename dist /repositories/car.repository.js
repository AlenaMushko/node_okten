"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const Car_model_1 = require("../models/Car.model");
class CarRepository {
    async getAll() {
        return await Car_model_1.Car.find();
    }
    async getAllOwner(id) {
        return (await Car_model_1.Car.find({ ownerId: id }).populate("ownerId", "name email"));
    }
    async create(value) {
        return (await Car_model_1.Car.create({ ...value }));
    }
    async findById(id) {
        return (await Car_model_1.Car.findById(id));
    }
    async updateByIdPut(id, value) {
        return (await Car_model_1.Car.findByIdAndUpdate(id, { ...value }, { new: true }));
    }
    async updateByIdPatch(id, value) {
        return (await Car_model_1.Car.findByIdAndUpdate(id, { ...value }, { new: true }));
    }
    async deleteById(id) {
        return (await Car_model_1.Car.deleteOne({ _id: id }));
    }
}
exports.carRepository = new CarRepository();
