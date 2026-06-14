import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateToken} from "../utils/generateToken.js"
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
// Register User
export const register = async (req,res)=>{
  try{
      // Get user data from request body
    const {name,email,password}=req.body;
    if(!name || !email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required."
      })
    }
    // Check if user already exists
    const user=await User.findOne({email});

    if(user){
      return res.status(400).json({
        success:false,
        message:"user already exist with this email"
      })
    }
      // Hash password before storing in database
    const hashedPassword=await bcrypt.hash(password,10);
      // Create new user
    await User.create({
      name,
      email,
      password:hashedPassword
    });
    return res.status(201).json({
      success:true,
      message:"Account created successfully."
    })
  } catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to register"
    })
  }
}
// Login User
export const login=async (req,res)=>{
  try{
      // Get login credentials
    const {email,password}=req.body;
    // Validate input fields
     if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required."
      })
    }
    // Find user by email
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Incorrect email or Password"
      })
    }
    // Compare entered password with hashed password
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        success:false,
        message:"Incorrect email or Password"
      })
    }
    const userWithoutPassword={
      _id:user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCourses: user.enrolledCourses,
      photoUrl: user.photoUrl
    }
    // Generate JWT token and login user
    generateToken(
   res,
   userWithoutPassword,
  `Welcome back ${user.name}`
);
  } catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to login"
    })
  }
}
export const logout=async (_,res)=>{
  try{
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"Logged out successfully",
      success:true
    })
  }catch(error){
      console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to logout"
    })
  }
}
export const getUserProfile=async (req,res)=>{
  try {
    const userId=req.id; 
    const user=await User.findById(userId).select("-password");
  if(!user){
    return res.status(404).json({
      message:"profile not found",
      success:false
    })
  }
  return res.status(200).json({
    success:true,
    user
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to load user"
    })
  }
}
export const updateProfile =async (req,res)=>{
  try {
    const userId=req.id;
    const {name}=req.body;
    const profilePhoto=req.file;
    const user =await User.findById(userId);
    if(!user){
      return res.status(404).json({
      message:"User not found",
      success:false
    })
    }
    // extract public id of the old image from the url if it exists
    if(user.photoUrl){
      const publicId=user.photoUrl.split("/").pop().split(".")[0];//extract public id
      deleteMediaFromCloudinary(publicId);
    }
    // upload new photo
    const cloudResponse=await uploadMedia(profilePhoto.path)
    const photoUrl=cloudResponse.secure_url;
    const updatedData={name,photoUrl};
    const updatedUser=await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");
    return res.status(200).json({
      success:true,
      user:updatedUser,
      message:"profile updated successfully"
    })
  } catch (error) {
     console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to update user"
    })
  }
}