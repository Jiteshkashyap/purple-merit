import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true , index:true},
    password:{type:String , required:true, select:false},
    role:{type:String , enum:['admin', 'user', 'manager'], default:'user'},
    status:{type:Boolean, default:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', default:null},
    updatedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', default:null}
},{timestamps:true})

const userModel =mongoose.model('User',userSchema)
export default userModel;