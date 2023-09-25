"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./users");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 5005;
app.use('/', users_1.usersRouter);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
