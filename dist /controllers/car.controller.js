"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const errors_1 = require("../errors");
const services_1 = require("../services");
const carValidation_1 = require("../validations/carValidation");
class CarController {
    async getAll(req, res, next) {
        try {
            const cars = await services_1.carService.getAll();
            return res.status(200).json(cars);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { error, value } = carValidation_1.carSchema.create.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            const newCar = await services_1.carService.create(value);
            return res.status(201).json({ message: "Car is created", car: newCar });
        }
        catch (e) {
            next(e);
        }
    }
    async findById(req, res, next) {
        try {
            const car = res.locals.car;
            return res.status(200).json({ data: car });
        }
        catch (e) {
            next(e);
        }
    }
    async updateByIdPut(req, res, next) {
        try {
            const { id } = req.params;
            const { value } = carValidation_1.carSchema.create.validate(req.body);
            const updatedCar = await services_1.carService.updateByIdPut(id, value);
            return res
                .status(200)
                .json({ messaga: "Car is updated", car: updatedCar });
        }
        catch (e) {
            next(e);
        }
    }
    async updateByIdPatch(req, res, next) {
        try {
            const { id } = req.params;
            const { value } = carValidation_1.carSchema.create.validate(req.body);
            const updatedCar = await services_1.carService.updateByIdPatch(id, value);
            return res
                .status(200)
                .json({ message: "Car is updated", user: updatedCar });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;
            await services_1.carService.deleteById(id);
            return res.status(200).json({ message: `Car id=${id} is deleted` });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
