import express from "express"
import { adminGetApplicant, applyJobs, getAppliedJob, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const route = express.Router();

route.get('/applyJob/:id', isAuthenticated,applyJobs);
route.get('/getApplyJobs',isAuthenticated,getAppliedJob);
route.get('/:id/getAdminAllApplicant',isAuthenticated,adminGetApplicant);
route.post('/status/:id/update',isAuthenticated,updateStatus);

export default route;
