import jwt from "jsonwebtoken";

 const isAuthenticated  = async (req,res,next)=>
{
    try {
        const token = req.cookies.token;
        if(!token)
        {
            return res.status(400).json({
                message:"user not authenticate",
                success:false
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        req.id = decode.userId;
        req.user = { id: decode.userId };
        next();

        if(!decode)
        {
            return res.status(400).json({
                message:"Invalid token",
                success:false

            })
        };
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        })
        
    }
} 
export default isAuthenticated;