import { Router } from "express";
import {  getAUserById, getAllUsers, loginUser, registerUser, updateUser } from "../controllers/userControllers";
import { accountRequired, adminPrivilege } from "../middlewares/verifyTokens";

const user_router = Router();
user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.get("/all",adminPrivilege,getAllUsers);
user_router.get("/one/:id",accountRequired,getAUserById);
user_router.put("/update/:id",updateUser)
// user_router.get("/reset",forgotPassword)

export default user_router;
