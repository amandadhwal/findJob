import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller";
import isAuthenticated from "../middleware/isAuthenticated";

const route=express.Router();

route.post("/register",register);
route.post("/login",login);
// route.post("/logout",logout);
route.post("profile/update",isAuthenticated,updateProfile);

export default route;




