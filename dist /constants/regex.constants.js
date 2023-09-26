"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexConstants = void 0;
exports.RegexConstants = {
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,20}$/,
};
