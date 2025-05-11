import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","verifier","admin"],
        default:"user"
    },
    balance:{
        type:Number,
        default:0
    }
})


export const User  = mongoose.model("User",UserSchema)