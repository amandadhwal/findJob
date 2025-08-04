import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'


const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHanfler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log("value of e", input);
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phonenumber", input.phonenumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
           
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData);
            console.log("data",res);
            if(res.data.success)
            {
                navigate("/login");
                console.log(res.data.message);

                toast.success(res.data.message);
            }else
            {
                toast.error(res.data.message);
                // console.log(res.data.message);
                // alert("email is already register");
            }
               

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-300 rounded-md p-6 my-10'>
                    <h1 className='font-bold text-2xl mb-5'>Sign Up</h1>

                    <div className='mb-4'>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input id="fullname" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} placeholder="Aman" />
                    </div>

                    <div className='mb-4'>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} placeholder="aman@gmail.com" />
                    </div>

                    <div className='mb-4'>
                        <Label htmlFor="phonenumber">Phone number</Label>
                        <Input id="phonenumber" name="phonenumber" type="text" value={input.phonenumber} onChange={changeEventHandler} placeholder="32723" />
                    </div>

                    <div className='mb-4'>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" value={input.password} onChange={changeEventHandler} placeholder="passwd" />
                    </div>

                    <div className='flex item-center justify-between '>
                        <RadioGroup className="flex item-center justify-between">
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="Recruiter" 
                                // checked={input.role === "Recruiter"} 
                                onChange={changeEventHandler} className="cursor-pointer" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>

                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <label>Profile</label>
                            <Input accept="image/*"
                                type="file"
                                // checked={input.role === "student"}
                                 onChange={changeFileHanfler}
                                className="cursor-pointer" />
                        </div>
                    </div>

                    <Button type="submit" className="w-full my-4">Signup</Button>
                    <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
