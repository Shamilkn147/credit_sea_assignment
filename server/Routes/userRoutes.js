import bcrypt from "bcrypt";
import { User } from "../models/UserModel.js";

export const register = async (req, res) => {
  try {
    let savings;
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    console.log("Password from request body:", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if(role === "user"){
      savings = 0
    }

    // Create and save the user
    const user = new User({
      fullName,
      email,
      password:hashedPassword,
      role,
      balance:savings
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }
        const returnUser = {id:user._id,fullName:user.fullName,email:user.email}
        res.status(201).json({message:"user login successful",user})
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
}

export const getUsers = async(req,res) =>{
  const users = await User.find({})
  res.status(201).json(users)
}

export const getSpecificUser = async(req,res) => {
  const {userId} = req.params
  const user = await User.findById(userId)
  res.status(201).json(user)
}