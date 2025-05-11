import { Borrow } from "../models/borrowerModel.js"
import { Cash } from "../models/savingsModel.js"
import dotenv from "dotenv"
import { User } from "../models/UserModel.js"

dotenv.config()
export const addCash = async(req,res) =>{
    const {savings} = req.body
    const cash = await Cash.findByIdAndUpdate(process.env.main)
    cash.savings +=  Number(savings)
    await cash.save()
    res.status(201).json({message:"savings updated succesfully",cash})
}
export const getSavings = async(req,res) => {
    const details = await Cash.find({})
    res.status(201).json(details)
}
export const changeInBorrowed = async(req,res) => {
    const {amount} = req.body
    const cash = await Cash.findByIdAndUpdate(process.env.main)
    cash.savings -= Number(amount)
    cash.cashBorrowed += Number(amount)
    await cash.save()
    res.status(201).json({message:"savings and borrowed have been changed",cash})
}

export const changeInRecieved = async(req,res) => {
    const {amount} = req.body
    const cash = await Cash.findById(process.env.main)
    cash.savings += Number(amount)
    cash.cashBorrowed -= Number(amount)
    cash.cashRecieved += Number(amount)
    await cash.save()
    res.status(201).json({message:"savings and borrowed and recieved have been changed",cash})
}

export const borrowedListAdd = async(req,res) =>{
    const {fullName} = req.body
    const borrow = new Borrow({fullName})
    await borrow.save()
    res.status(201).json({message:"succesfully added user to borrowers list"})
}

export const borrowerListremove = async(req,res) => {
    const {fullName} = req.body
    const borrow = await Borrow.findOneAndDelete({fullName})
    res.status(201).json({message:"the user has been removed from borrowers successfully"})
}

export const getBorrowers = async(req,res) =>{
    const borrow = await Borrow.find({})
    res.status(201).json(borrow)
}

export const addBalance = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        console.log(req.body)
        if (!userId || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Invalid userId or amount' });
        }

        const balance = await User.findByIdAndUpdate(
            userId,
            { $inc: { balance: amount } },
            { new: true }
        );

        if (!balance) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json(balance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const removeBalance = async(req,res) => {
    const {userId,amount} = req.body
    const balance = await User.findByIdAndUpdate(userId,{$inc:{balance:-amount}},{new:true})
    res.status(201).json(balance)
}