import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    fullName:{
        type:String
    }
})

export const Borrow = mongoose.model("Borrow",borrowSchema)