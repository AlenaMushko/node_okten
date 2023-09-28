"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const errors_1 = require("../errors");
const services_1 = require("../services");
const validations_1 = require("../validations");
class UserController {
    async findAll(req, res, next) {
        try {
            const users = await services_1.userService.findAll();
            return res.status(200).json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const { error, value } = validations_1.userSchema.create.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            const newUser = await services_1.userService.create(value);
            return res
                .status(201)
                .json({ message: "User is created", user: newUser });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const user = res.locals.user;
            return res.status(200).json({ data: user });
        }
        catch (error) {
            next(error);
        }
    }
    async updateByIdPut(req, res, next) {
        try {
            const { id } = req.params;
            const { value } = validations_1.userSchema.create.validate(req.body);
            const updatedUser = await services_1.userService.updateByIdPut(id, value);
            return res
                .status(200)
                .json({ message: "User is updated", user: updatedUser });
        }
        catch (e) {
            next(e);
        }
    }
    async updateByIdPatch(req, res, next) {
        try {
            const { id } = req.params;
            const { value } = validations_1.userSchema.updateUserSchema.validate(req.body);
            const updatedUser = await services_1.userService.updateByIdPatch(id, value);
            return res
                .status(200)
                .json({ message: "User is updated", user: updatedUser });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;
            await services_1.userService.deleteById(id);
            return res.status(200).json({ message: `User id=${id} is deleted` });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
