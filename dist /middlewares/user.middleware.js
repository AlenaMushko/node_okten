"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const validations_1 = require("../validations");
class UserMiddleware {
    async findByIdByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const user = await repositories_1.userRepository.findById(id);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            res.locals.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async UpdateByIdByThrow(req, res, next) {
        try {
            const { id } = req.params;
            const user = await models_1.User.findById(id);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            const { error } = validations_1.userSchema.create.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
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
            const user = await models_1.User.findById(id);
            if (!user) {
                throw new errors_1.ApiError("User not found", 404);
            }
            const { error } = validations_1.userSchema.updateUserSchema.validate(req.body);
            if (error) {
                throw new errors_1.ApiError("Validation failed", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
