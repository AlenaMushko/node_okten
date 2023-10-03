"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const Token_modal_1 = require("../models/Token.modal");
class TokenRepository {
    async createToken(body) {
        return await Token_modal_1.Token.create(body);
    }
    async getByID(userId) {
        return await Token_modal_1.Token.findOne({ _userId: userId });
    }
    async logout(_id) {
        await Token_modal_1.Token.deleteOne({ _id });
    }
}
exports.tokenRepository = new TokenRepository();
