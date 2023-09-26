"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.EGenders = void 0;
const mongoose_1 = require("mongoose");
var EGenders;
(function (EGenders) {
    EGenders["Male"] = "male";
    EGenders["Female"] = "female";
})(EGenders || (exports.EGenders = EGenders = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        min: [3, "Name min 3 symbols"],
        max: [30, "Name max 20 symbols"],
    },
    age: {
        type: Number,
        min: [0, "Age min 0"],
        max: [120, "Age max 120"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    gender: {
        type: String,
        enum: EGenders,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("user", userSchema);
