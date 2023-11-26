"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const user_router = (0, express_1.Router)();
user_router.post("/register", userControllers_1.registerUser);
user_router.post("/login", userControllers_1.loginUser);
exports.default = user_router;
