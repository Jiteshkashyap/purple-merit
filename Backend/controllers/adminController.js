import { createUser, deactivateUserService, getUserById, updateUser ,getUsers,getDashboardStats } from "../services/adminService.js";


export const createUserController = async(req,res)=>{
    try{
       const {user , generatedPassword} = await createUser(req.body , req.user.id)
         console.log("USER CREATED:", user);
        res.status(201).json({
            message:"User created successfully",
            user,
            generatedPassword
        });
    } catch (error) {
        res.status(400).json({
            message:"Error in creating user",
            error:error.message
        });
    }
}

export const getAllUsersContoller =async(req,res)=>{
    try {
      const users = await getUsers(req.query);
        res.status(200).json({
            message:"Users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({
            message:"Error in fetching users",
            error:error.message
        });
    }
}

export const getUser = async(req,res)=>{
    try {

    const user = await getUserById(req.params.id)

        res.status(200).json({
            message:"User fetched succefully",
            user
        })
        
    } catch (error) {
        res.status(404).json({
            message:"Error in fetching user",
            error:error.message
        })
    }
}

export const updateUserController = async(req,res)=>{
    try{
      
        const updatedUser = await updateUser(req.params.id , req.body , req.user.id, req.user.role)
       
        return res.status(200).json({
            message:"User updated Succefully",
            updatedUser
        })

    }catch(error){
        res.status(400).json({
            message:"Erorr in updating user",
            error: error.message
        })
    }
}

export const deleteUser = async(req,res)=>{
    try{
       await deactivateUserService(req.params.id , req.user.id)

        res.status(200).json({
            message:"User deleted successfully"
        })
    }catch(error){
        res.status(400).json({
            message:"Error in deleting user",
            error:error.message
        })
    }
}

export const getDashboardController = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.status(200).json({ 
    message: "Dashboard stats",
    stats 
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching dashboard", error: error.message });
  }
};