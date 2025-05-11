import mongoose from "mongoose";

const savingsSchema = new mongoose.Schema({
    cashBorrowed :{
        type:Number,
        default:0
    },
    cashRecieved:{
        type:Number,
        default:0
    },
    savings:{
        type:Number
    },
    repaidLoans:{
        type:Number,
        default:0
    }
})

export const Cash = mongoose.model("Cash",savingsSchema)