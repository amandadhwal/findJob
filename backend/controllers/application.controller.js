import { application } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
// import { Job } from "../models/job.model";

//apply for job 
export const applyJobs =async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;
        // console.log(jobId);
        // const userId = req.id;
        if(!jobId)
        {
            return res.status(400).josn({
                message:"job id is required",
                success:false
            })
        };
        //check user already apply or not

        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication)
            {
                return res.status(400).josn({
                    message:" user already apply for this job",
                    success:false
                })
            };

        //check job exist  
        const job =await Job.findById(jobId);

        if(!job)
            {
                return res.status(400).josn({
                    message:" job not found",
                    success:false
                })
            };
            // create a new application
            const newApplication = await Application.create({
                job:jobId,
                applicant:userId,

            });

            job.application.push(newApplication._id);
            await job.save();

            return res.status(201).json({
                message:"job applied successfully",
                success:true
            })

    }catch(error)
    {
        console.log(error);
    }
}
//get all applied jobs
export const getAppliedJob = async(req,res)=>{
    try {
        const userId = req.id;

        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).
        populate({
            path:'job',
            option:{sort:{createdAt:-1}},
            populate:{path:'company',
            option:{sort:{createdAt:-1}},
            }
        
        });

        if(!applications)
        {
            return res.status(404).json({
                    message:"not application",
                    success:false
            })
        }

        return res.status(200).json({
            applications,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

//admin dekhega kitna user apply kiya h
export const adminGetApplicant=async(req,res)=>
{
    try {
        // const adminId = req.id;
        const jobId = req.params.id;

        const findjob = await Job.findById(jobId).
        populate({path:'application',
            options:{sort:{createdAt:-1}},
            populate:{path:'applicant'}
        })
        if(!findjob)
        {
            return res.status(404).json({
                message:"job not found",
                success:false
        })
        }
        return res.status(200).json({
            findjob,
            success:true
        })

        
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus=async(req,res)=>{
    try {
        const {status} = req.body;
        const applicantId = req.params.id;

        if(!status)
        {
            return res.status(404).json({
                message:"status not found",
                success:false
            })
        }
        //find application by applicant id
        const findApplication = await Application.findById({_id:applicantId});

        if(!findApplication)
        {
            return res.status(404).json({
                message:"application not found",
                success:false
            })
        }

        //update the status
        findApplication.status = status.toLowerCase();
        await findApplication.save();

        return res.status(200).json({
            message:"update succesfully",
            success:true
    }) 
        
    } catch (error) {
        console.log(error);
    }
}