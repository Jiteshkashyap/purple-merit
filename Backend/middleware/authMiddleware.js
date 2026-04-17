import { verifyAccessToken } from "../utils/token.js";

export const authMiddleware = (req,res,next)=>{
    try {

        const token = req.cookies.accessToken

        if(!token){
            res.status(401).json({
                message:"No token found"
            })
        }

        const decoded = verifyAccessToken(token);
        req.user= decoded;

        next();
        
    } catch (error) {
        res.status(500).json({
            message:"Error in Authentication",
            error:error.message
        })
    }
}

export const authorizeRoles =(...roles)=>(req,res,next)=>{
    
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                message:"Forbidden"
            })
        }
        next()

}