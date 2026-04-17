import userModel from "../models/userModel.js";
import { generateAccessToken , generateRefreshToken , verifyRefreshToken } from "../utils/token.js";
import { registerUser ,loginUser } from "../services/authService.js";

export const registerController = async(req,res)=>{
    try{
 
         const user = await registerUser(req.body)
        
         res.status(201).json({
            message:"User registered Succesfully",
            user:user, 
         })

    }catch(error){
        res.status(400).json({
            message:"Error in Registering User",
            error:error.message
        })

    }
}

export const loginController= async(req,res)=>{
    try {

        const {email, password} = req.body
        const user = await loginUser(email,password)

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.status(200).cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 60*60*1000
        }).cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 7*24*60*60*1000
        }).json({
            message:"Login Succesfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                status:user.status
            }
        })
        
    } catch (error) {
        res.status(401).json({
            message:"Error in Login User",
            error:error.message
        })
    }
}

export const refreshTokenController = async(req,res)=>{
    try {

        const refreshToken = req.cookies.refreshToken

        if(!refreshToken){
           return res.status(401).json({
                message:"No Refresh token found"
            })
        }

        const decoded = verifyRefreshToken(refreshToken)
        const user = await userModel.findById(decoded.id)

        if(!user){
           return res.status(401).json({
                message:"User not found"
            })
        }
        const accessToken = generateAccessToken(user)
        res.status(200).cookie('accessToken' , accessToken,{
             httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 60*60*1000
        }).json({
            message:"AccessToken refreshed Succesfully"
        })
        
    } catch (error) {
                res.status(500).json({
            message:"Error in Registering User",
            error:error.message
        })
    }
}

export const logout = async(req,res)=>{
     res.clearCookie('accessToken')
     res.clearCookie('refreshToken')

     res.json({
        message:"Logged Out Succesfully"
     })
}