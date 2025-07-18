import mongoose from "mongoose";
const companySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        // required:true,
    },
    website:{
        type:String,
        // required:true,
    },
    location:{
        type:String,
        // required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{timestamps:true})

export const Company=mongoose.model("Company",companySchema);