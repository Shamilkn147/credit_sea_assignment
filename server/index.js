import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { getSpecificUser, getUsers, login, register } from "./Routes/userRoutes.js"
import { changeStatus, getLoans, loanApplication } from "./Routes/loanRoute.js"
import { addBalance, addCash, borrowedListAdd, borrowerListremove, changeInBorrowed, changeInRecieved, getBorrowers, getSavings, removeBalance } from "./Routes/cashRoute.js"

const app = express()
app.use(cors())
app.use(express.json());
dotenv.config()

const connectDb = async() =>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoDB connected")
}

app.post("/register",register)
app.post("/login",login)
app.post("/loanApply",loanApplication)
app.get("/getLoans",getLoans)
app.get("/getUsers",getUsers)
app.patch("/addCash",addCash)
app.patch("/changeBorrowed",changeInBorrowed)
app.patch("/changeRecieved",changeInRecieved)
app.post("/addBorrowers",borrowedListAdd)
app.delete("/removeBorrowers",borrowerListremove)
app.get("/getBorrowers",getBorrowers)
app.get("/getDetails",getSavings)
app.patch("/changeStatus",changeStatus)
app.patch("/addbalance",addBalance)
app.patch("/removebalance",removeBalance)
app.get("/user/:${userId}",getSpecificUser)

app.get("/",(req,res)=>{
    res.send("this is the main page")
})

app.listen(3000, async ()=>{
    console.log("the server started at 3000")
    await connectDb()
})
