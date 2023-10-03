"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const currentYear = new Date().getFullYear();
const carSchema = new mongoose_1.Schema({
    model: {
        type: String,
        min: [3, "Name min 3 symbols"],
        max: [30, "Name max 20 symbols"],
    },
    year: {
        type: Number,
        min: [1995, "Year min 1995"],
        max: [currentYear, `Year max ${currentYear}`],
    },
    price: {
        type: Number,
        min: [1, "Price min 1"],
        max: [1000000, "Price max 1000000"],
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Car = (0, mongoose_1.model)("car", carSchema);
