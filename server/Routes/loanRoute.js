import { Loan } from "../models/loanModel.js"

export const loanApplication = async(req,res)=>{
    try {
        const {user,fullName, amount, tenure, employment, reason, employmentAddress} = req.body
        const loan = new Loan({user,fullName, amount, tenure, employment, reason, employmentAddress})
        await loan.save()
        res.status(201).json({message:"successfully applied for loan",loan})
        } catch (error) {
        res.status(500).json({error})
    }
}


export const getLoans = async(req,res) => {
    try {
        const loans = await Loan.find({})
        res.status(201).json(loans)
    } catch (error) {
        throw new Error(error)
    }
}

export const changeStatus = async(req,res) => {
    try {
        const {loanId,status} = req.body
        const loans = await Loan.findByIdAndUpdate(loanId,{status},{new:true,validators:true})
        res.status(201).json(loans)
    } catch (error) {
        throw new Error(error)
    }
}