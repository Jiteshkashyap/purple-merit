import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'


export const registerUser = async (userData) => {
    const exists = await userModel.findOne({ email: userData.email });
    if (exists) throw new Error('Email already exists');

    const hashed = await bcrypt.hash(userData.password, 10);

    const user = await userModel.create({
        ...userData,
        password: hashed
    });
    
    return user;
};

export const loginUser= async(email,password)=>{

    const user = await userModel.findOne({email:email}).select('+password')
    if(!user) throw new Error('User not found')
    
            if (user.status === false) {
            throw new Error('User account is inactive .Please contact admin');
        }


    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('Invalid credentials')


    return user;
}