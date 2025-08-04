import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectdb from "./utils/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import companyRoute from"./routes/company.routes.js";
import jobPost from "./routes/job.routes.js";
import newapplicant from "./routes/application.route.js"


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//middle ware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// const corsOptions = {
//     origin:'http/localhost:5176',
//     Credential:true
// }

// app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobPost);
app.use("/api/v1/application",newapplicant);


app.listen(PORT,(req,res)=>{
    connectdb();
    console.log(`server running port no ${PORT}`);
})