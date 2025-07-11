import mongoose from "mongoose"

const connectdb=async()=>
{
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("mongodb connect succesfully");
    }catch(error)
    {
        console.log("error mongo connection");
        process.exit(1); 
    }
}

export default connectdb;
