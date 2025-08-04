import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'


const Login = () => {
    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "",

    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // const changeFileHanfler=(e)=>{
    //     setInput({...input,file:e.target.files?.[0]});
    // }

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input);
            console.log(res.data.success);
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
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
                    <h1 className='font-bold text-2xl mb-5'>Login</h1>

                    {/* <div className='mb-4'>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input id="fullname" name="fullname" type="text" placeholder="Aman" />
                    </div> */}

                    <div className='mb-4'>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} placeholder="aman@gmail.com" />
                    </div>



                    <div className='mb-4'>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" value={input.password} onChange={changeEventHandler} placeholder="passwd" />
                    </div>

                    <div className='flex item-center justify-between '>
                        <RadioGroup className="flex item-center justify-between">
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label>Recruiter</Label>
                            </div>

                        </RadioGroup>


                    </div>

                    <Button type="submit" className="w-full my-4">Login</Button>
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
