import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    fullName:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    tenure:{
        type:Number,
        required:true
    },
    employment:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    employmentAddress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","verified","rejected"],
        default:"pending"
    }
},{timeStamp:true})

export const Loan = mongoose.model("Loan",loanSchema)