import { Company } from "../models/company.model.js";
import {Job} from "../models/job.model.js"
// import mongoose from "mongoose";
//admin post krega job
export const postjob =async(req,res)=>
{
    try{
        const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
        const userId = req.id;
        // console.log(title);

        // const val = {title,description,requirements,salary,location,jobType,experience,position,companyId};

        if(!title||!description||!requirements||!salary||!location||!jobType||!experience||!position||!companyId)
        {
            return res.status(400).json({
                message:"something is required",
                success:false
            })
        }

        const job= await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId

        });

        res.status(201).json({
            message:"new job created successfully",
            job,
            success:true
        });

    }catch(error)
    {
        console.log(error);
    }

}
//student k liye hoga 

export const getAllJob =async(req,res)=>
{
    try{
        const keyword = req.query.keyword || "";
        console.log(keyword);

        const query = {
            $or:[
                {title:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword, $options:'i'}}
            ]
        };
        const job = await Job.find(query).populate({
            path:"company"}).sort({createdAt:-1});
        if(!job)
        {
           return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }

        return res.status(201).json({
            job,
            success:true
        })

    }catch(error)
    {
        console.log(error);
    }
}
//student k liye hoga 
export const getJobById =async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if(!job)
        {
            return res.status(400).json({
                message:"job data not found",
                success:false
            })
        }
        
            return res.status(201).json({
                job,
                success:true
            })
           
    } catch (error) {
        console.log(error);
        
    }
}

//admin kitne job create kra h
export const getAdminJob=async(req,res)=>{
    try{
        const adminId = req.id;
        if (!adminId) {
            return res.status(400).json({
                message: "Admin ID is required",
                success: false
            });
        }

        const jobs = await Job.find({created_by:adminId});
        // console.log(jobs);
        if(!jobs)
            {
                return res.status(400).json({
                    message:"job data not found",
                    success:false
                })
            }
            
                return res.status(201).json({
                    jobs,
                    success:true
                })
    }catch(error)
    {
        console.log(error);
    }

}