import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//register function
export const register= async(req, res)=>{
    try {
        //check missing or not
            const {fullname, email, password, phoneNumber, role}= req.body;
            if(!fullname ||!email|| !password || !phoneNumber || !role)
            {
                return res.status(400).json({
                    message:"something is missing",
                    success:false,
                });    
            }
            //check email already exist or not
            const user = await User.findOne({email});
            if(user)
            {
                return res.status(400).json({
                    message:"email is already register",
                    success:false,
                })
            }

            // encrypt password using bcrypt

            const hashedPassword= await bcrypt.hash(password,10);
            await User.create({
                fullname,
                email,
                password:hashedPassword,
                phoneNumber,
                role,

            })

            return res.status(201).json({
                message:"account created successfully",
                success:true,

            })

    } catch (error) {
        console.log(error);
    }
}
//login function 
export const login = async(req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email|| !password || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
            });
        };
        const user = await User.findOne({email})
        {
            if(!user)
            {
                return res.status(400).json({
                    message:"incorrect email or password",
                    success:false,
                })
            }
        }
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch)
        {
            return res.status(400).json({
                message:"incorret email or password",
                success:false,
            });
        };

        if(role != user.role)
        {
            return res.status(400).json({
                message:"account does not exist with current role",
                success:false,
            })
        };
        //generate JWT token
        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1D'});
        user = {
            _id: user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true, sameSite:"strict"}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success:true,
        })


    }catch(error)
    {
        console.log(`error ${error}`);
    }
}

export const logout = async(res,req)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logout successfully",
        success:true,
        })
    }catch(error)
    {
        console.log(error);
    }
}

//updatedProfile function
export const updateProfile = async(res,req)=> {
    try{
        const{fullname, email, phoneNumber, bio, skills}= req.body;
        const file= req.file;
        if(!fullname|| !email || !phoneNumber || !bio || !skills)
        {
            return res.status(400).json({
                message: "something is missing",
                success:false,
            });
        };

        //cloud come here

        const skillsArray=skills.split(",");
        const userId= req.id;

        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(400).json({
                message:"user is invalid",
                success:false,
            })
        }
        //updating data
        user.fullname = fullname,
        user.email=email,
        user.phoneNumber = phoneNumber,
        user.profile.bio=bio,
        user.profile.skills=skillsArray
        
        //resume come later

        await user.save();
        //update user
        user = {
            _id: user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"profile updated succesfully",
            user,
            success:true,
        })

    }
    catch(error)
    {
        console.log(error);
    }
}

