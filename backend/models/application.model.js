import mongoose from "mongoose";
const applicationSchema=mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true,
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        enum:['pending','acccepted','rejected'],
        default:'pending'
    }
},{timeStamps:true})
export const Appication=mongoose.model("Appication",applicationSchema);