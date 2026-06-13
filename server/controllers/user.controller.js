import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateToken} from "../utils/generateToken.js"
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