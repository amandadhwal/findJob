import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const route = express.Router();

route.post("/register",isAuthenticated,registerCompany);
route.get("/get",isAuthenticated,getCompany);
route.get("/get/:id",isAuthenticated,getCompanyById);
route.put("/update/:id",isAuthenticated,updateCompany);

export default route;
