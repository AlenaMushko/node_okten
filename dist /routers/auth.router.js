"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/register", controllers_1.authController.register);
router.get("/login", controllers_1.authController.login);
exports.authRouter = router;
