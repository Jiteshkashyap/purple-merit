import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';


export const getUser = async(id)=>{
    const user = await userModel.findById(id);

    if(!user) throw new Error('User not found');
    return user;
}

export const updateProfile = async (userData, id) => {
    const updatedData = { ...userData };

   
    if (userData.password) {
        updatedData.password = await bcrypt.hash(userData.password, 10);
    } else {
        delete updatedData.password;
    }

    return await userModel.findByIdAndUpdate(id, updatedData, { returnDocument: "after" });
};