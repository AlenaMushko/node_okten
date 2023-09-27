"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const validations_1 = require("../validations");
class UserMiddleware {
    async findByIdByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const users = await models_1.User.find();
            const user = users.find((user) => user.id === id);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async UpdateByIdByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const users = await models_1.User.find();
            const { error } = validations_1.userSchema.create.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            const user = users.find((user) => user.id === id);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async UpdateByIdPatchByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const users = await models_1.User.find();
            const { error } = validations_1.userSchema.updateUserSchema.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            const user = users.find((user) => user.id === id);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
