import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { generatePassword } from "../utils/passwordGenerator.js";

export const getUsers = async (query) => {
  const { page = 1, limit = 10, role, status, search } = query;

  const filter = {};

  if (role) filter.role = role;
  if (status === "active") filter.status = true;
  else if (status === "inactive") filter.status = false;
  if (search) filter.name = { $regex: search, $options: "i" };

  const [users, totalDocs] = await Promise.all([
    userModel.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    userModel.countDocuments(filter), 
  ]);

  return {
    users,
    totalDocs,
    totalPages: Math.ceil(totalDocs / limit),  
    currentPage: Number(page),
  };
};
export const getUserById = async(id)=>{
    const user = await userModel.findById(id)
    .populate("createdBy updatedBy" , "name email")

    if(!user) throw new Error('User not found')

    return user;
}

export const createUser = async(userData, adminId)=>{

    let { name, email, password, role,status } = userData;

    status = status === "active";
    
    const finalPassword = password || generatePassword();

    const hashed = await bcrypt.hash(finalPassword, 10);
    
    const user = await userModel.create({
        name,
        password:hashed,
        email,
        role,
        status,
        createdBy:adminId
    });
    return {
    user,
    generatedPassword: password ? null : finalPassword
  };

}

export const updateUser = async (
  id,
  userData,
  requesterId,
  requesterRole
) => {
  const user = await userModel.findById(id);
  if (!user) throw new Error("User not found");

  const updateData = { ...userData };

  if (updateData.status) {
    updateData.status = updateData.status === "active";
  }

  if (requesterRole !== "admin" && updateData.role && updateData.role !== user.role) {
  throw new Error("Forbidden: Only admin can change role");
 }
  if (requesterRole === "manager" && user.role === "admin") {
    throw new Error("Manager cannot update admin user");
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  } else {
    delete updateData.password;
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      ...updateData,
      updatedBy: requesterId,
    },
    { returnDocument: "after" }
  );

  return updatedUser;
};

export const deactivateUserService = async (id, adminId) => {
  return await userModel.findByIdAndUpdate(
    id,
    { status: false, updatedBy: adminId },
    { returnDocument: "after" }
  );
};

export const getDashboardStats = async () => {
  const [totalUsers, activeUsers, inactiveUsers, roleStats] = await Promise.all([
    userModel.countDocuments(),
    userModel.countDocuments({ status: true }),
    userModel.countDocuments({ status: false }),
    userModel.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ])
  ]);

  const usersByRole = { admin: 0, manager: 0, user: 0 };
  roleStats.forEach(r => usersByRole[r._id] = r.count);

  return { totalUsers, activeUsers, inactiveUsers, usersByRole };
};