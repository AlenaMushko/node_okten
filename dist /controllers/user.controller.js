"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
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
            const newUser = await services_1.userService.create(req.body);
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
            const { userId } = req.params;
            const updatedUser = await services_1.userService.updateByIdPut(userId, req.body);
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
            const { userId } = req.params;
            const updatedUser = await services_1.userService.updateByIdPatch(userId, req.body);
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
            const { userId } = req.params;
            await services_1.userService.deleteById(userId);
            return res.status(200).json({ message: `User id=${userId} is deleted` });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
