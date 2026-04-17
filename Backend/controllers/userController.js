import { getUser, updateProfile } from "../services/userService.js";


export const getUserProfile = async(req,res)=>{
    try {
        const user = await getUser(req.user.id)
        res.status(200).json({
            message:"User profile fetched successfully",
            user
        })
    } catch (error) {
        res.status(400).json({
            message:"Error in fetching user Profile",
            error:error.message
        })
    }
}
export const updateUserProfile = async(req,res)=>{

    try {
        const user = await updateProfile(req.body , req.user.id)
        res.status(200).json({
            message:"User Profile updated succesfully",
            user
        })
        
    } catch (error) {
            res.status(400).json({
            message:"Error in updating user Profile",
            error:error.message
        })
    }
}