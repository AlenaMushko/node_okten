"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
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
        try {
            const user = res.locals.user;
            const tokenObj = res.locals.tokenObj;
            const tokensPair = await services_1.tokenService.refreshToken(user, tokenObj._id);
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
