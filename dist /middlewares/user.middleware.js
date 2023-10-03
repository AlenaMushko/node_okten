"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
class UserMiddleware {
    async findByIdByThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await repositories_1.userRepository.findById(userId);
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
}
exports.userMiddleware = new UserMiddleware();
