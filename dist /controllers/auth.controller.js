"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const Token_modal_1 = require("../models/Token.modal");
const token_repository_1 = require("../repositories/token.repository");
const services_1 = require("../services");
class AuthController {
    async register(req, res, next) {
        try {
            await services_1.authService.register(req.body);
            return res.status(201).json("User created");
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const tokenPair = await services_1.authService.login(req.body);
            return res.status(200).json({ ...tokenPair });
        }
        catch (e) {
            next(e);
        }
    }
    currentUser(req, res, next) {
        try {
            const user = res.locals.user;
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async refreshToken(req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new errors_1.ApiError("Authorization header missing", 401);
        }
        const [bearer, token] = authorization.split(" ");
        if (!bearer || !token) {
            throw new errors_1.ApiError("Not authorized", 401);
        }
        try {
            const tokenObj = await Token_modal_1.Token.findOne({ accessToken: token });
            if (!tokenObj) {
                throw new errors_1.ApiError("Access Denied. No refresh token provided", 401);
            }
            const user = (await models_1.User.findOne({
                _id: tokenObj._userId,
            }));
            const tokensPair = services_1.tokenService.generateTokenPairs({
                userId: user._id,
                name: user.name,
            });
            await Token_modal_1.Token.deleteOne({
                _id: tokenObj._id,
            });
            await token_repository_1.tokenRepository.createToken({ ...tokensPair, _userId: user._id });
            return res.status(200).json({ ...tokensPair });
        }
        catch (e) {
            next(e);
        }
    }
    async updateUser(req, res, next) {
        try {
            const user = res.locals.user;
            const updateUser = await services_1.authService.updateUser(user._id, req.body);
            return res.status(200).json(updateUser);
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const token = res.locals.tokenModel;
            await services_1.tokenService.logout(token._id);
            return res.status(204).json("Logout success");
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
