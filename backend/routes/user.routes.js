import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const route=express.Router();

route.post("/register",register);
route.get("/login",login);
route.post("/logout",logout);
route.post("/profile/update",isAuthenticated,updateProfile);

export default route;




