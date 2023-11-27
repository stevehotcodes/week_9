"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const verifyTokens_1 = require("../middlewares/verifyTokens");
const user_router = (0, express_1.Router)();
user_router.post("/register", userControllers_1.registerUser);
user_router.post("/login", userControllers_1.loginUser);
user_router.get("/all", verifyTokens_1.adminPrivilege, userControllers_1.getAllUsers);
user_router.get("/one/:id", verifyTokens_1.accountRequired, userControllers_1.getAUserById);
user_router.put("/update/:id", userControllers_1.updateUser);
// user_router.get("/reset",forgotPassword)
exports.default = user_router;
