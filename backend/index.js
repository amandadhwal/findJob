import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectdb from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";


const app = express();
dotenv.config({});

//middle ware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http/localhost:5052',
    Credential:true
}

app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);

app.listen(PORT,(req,res)=>{
    connectdb();
    console.log(`server running port no ${PORT}`);
})