import express from "express"
import { getAdminJob, getAllJob, getJobById, postjob } from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/postJob",isAuthenticated, postjob);
router.get("/getAllJob",isAuthenticated,getAllJob);
router.get('/getJobById/:id',isAuthenticated,getJobById);
router.get('/getAdminJobs',isAuthenticated,getAdminJob);

export default router;