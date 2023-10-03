"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../errors");
class CommonMiddleware {
    isIdValid(fileId) {
        return (req, res, next) => {
            try {
                const id = req.params[fileId];
                if (!mongoose_1.default.isObjectIdOrHexString(id)) {
                    throw new errors_1.ApiError("Not valid Id", 400);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    isBodyValid(validator) {
        return (req, res, next) => {
            try {
                const { error, value } = validator.validate(req.body);
                if (error) {
                    const errorMessage = error.message;
                    throw new errors_1.ApiError(errorMessage, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
