"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../errors");
class IdMiddleware {
    async isIdWalid(req, res, next) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.isObjectIdOrHexString(id)) {
                throw new errors_1.ApiError("Not valid Id", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.idMiddleware = new IdMiddleware();
