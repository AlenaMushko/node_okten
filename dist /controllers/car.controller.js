"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const services_1 = require("../services");
class CarController {
    async getAll(req, res, next) {
        try {
            const cars = await services_1.carService.getAll();
            return res.status(200).json(cars);
        }
        catch (e) {
            next(e);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async create(req, res, next) {
        try {
            const newCar = await services_1.carService.create(req.body);
            return res.status(201).json({ message: "Car is created", car: newCar });
        }
        catch (e) {
            next(e);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async findById(req, res, next) {
        try {
            const car = res.locals.car;
            return res.status(200).json({ data: car });
        }
        catch (e) {
            next(e);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async updateByIdPut(req, res, next) {
        try {
            const { carId } = req.params;
            const updatedCar = await services_1.carService.updateByIdPut(carId, req.body);
            return res
                .status(200)
                .json({ messaga: "Car is updated", car: updatedCar });
        }
        catch (e) {
            next(e);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async updateByIdPatch(req, res, next) {
        try {
            const { carId } = req.params;
            const updatedCar = await services_1.carService.updateByIdPatch(carId, req.body);
            return res
                .status(200)
                .json({ message: "Car is updated", user: updatedCar });
        }
        catch (e) {
            next(e);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
    async deleteById(req, res, next) {
        try {
            const { carId } = req.params;
            await services_1.carService.deleteById(carId);
            return res.status(200).json({ message: `Car id=${carId} is deleted` });
        }
        catch (e) {
            next(e);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
}
exports.carController = new CarController();
