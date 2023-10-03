"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
class AuthMiddleware {
    async uniqueEmail(req, res, next) {
        try {
            const user = await repositories_1.authRepository.findOne(req.body.email);
            if (user) {
                throw new errors_1.ApiError("Email already exists", 409);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async loginError(req, res, next) {
        try {
            const user = await repositories_1.authRepository.findOne(req.body.email);
            if (!user) {
                throw new errors_1.ApiError("Invalid email or password", 401);
            }
            const isMatched = await services_1.passwordService.compare(req.body.password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 401);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
