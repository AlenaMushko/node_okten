"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config");
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
const token_repository_1 = require("../repositories/token.repository");
const tokenSecret = config_1.configs.ACCESS_TOKEN_SECRET;
class AuthenticateMiddleware {
    async isLogin(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                throw new errors_1.ApiError("Authorization header missing", 401);
            }
            const [bearer, token] = authorization.split(" ");
            if (!bearer || !token) {
                throw new errors_1.ApiError("Not authorized", 401);
            }
            const { userId } = jwt.verify(token, tokenSecret);
            const user = await repositories_1.userRepository.findById(userId);
            const tokenModel = await token_repository_1.tokenRepository.getByID(userId);
            if (!user || !tokenModel) {
                throw new errors_1.ApiError("Token not valid", 401);
            }
            res.locals.user = user;
            res.locals.tokenModel = tokenModel;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authenticateMiddleware = new AuthenticateMiddleware();
