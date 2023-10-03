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
exports.tokenService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../config");
const repositories_1 = require("../repositories");
const token_repository_1 = require("../repositories/token.repository");
const accessTokenSecret = config_1.configs.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = config_1.configs.REFRESH_TOKEN_SECRET;
class TokenService {
    generateTokenPairs(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: "30d",
        });
        return { accessToken, refreshToken };
    }
    async logout(id) {
        await token_repository_1.tokenRepository.logout(id);
    }
    async refreshToken(refreshToken) {
        const tokenSecret = config_1.configs.REFRESH_TOKEN_SECRET;
        const { id } = jwt.verify(refreshToken, tokenSecret);
        const user = await repositories_1.userRepository.findById(id);
        const tokensPair = exports.tokenService.generateTokenPairs({
            userId: user._id,
            name: user.name,
        });
        return tokensPair;
    }
}
exports.tokenService = new TokenService();
