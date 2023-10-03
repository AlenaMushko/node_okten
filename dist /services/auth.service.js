"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const repositories_1 = require("../repositories");
const token_repository_1 = require("../repositories/token.repository");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(body) {
        const { password } = body;
        const hashadPassword = await password_service_1.passwordService.hash(password);
        await repositories_1.authRepository.register(body, hashadPassword);
    }
    async login(body) {
        const { email } = body;
        const user = await repositories_1.authRepository.findOne(email);
        const tokensPair = token_service_1.tokenService.generateTokenPairs({
            userId: user._id,
            name: user.name,
        });
        await token_repository_1.tokenRepository.createToken({ ...tokensPair, _userId: user._id });
        return tokensPair;
    }
    async updateUser(userId, body) {
        return await repositories_1.authRepository.updateUser(userId, body);
    }
}
exports.authService = new AuthService();
