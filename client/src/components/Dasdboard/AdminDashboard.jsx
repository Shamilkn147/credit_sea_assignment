import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import "./VerifiedDashboard.css"
import Navbar from '../Navbar/Navbar'

const AdminDashboard = () => {
  const queryClient = useQueryClient()
  const [buttonStatus, setButtonStatus] = useState("")

  const {data:loans,isError,error} = useQuery({
    queryKey:["loans"],
    queryFn:async()=>{
        const response = await axios.get("http://localhost:3000/getLoans")
        return response.data
    },onSuccess:(data)=>{
     console.log()
    }
})


const {data:cashDetails} = useQuery({
  queryKey:["cashDetails"],
  queryFn:async()=>{
    const response = await axios.get("http://localhost:3000/getDetails")
    return response.data[0]
  }
})


const {data:getBorrowers} = useQuery({
  queryKey:["getBorrowers"],
  queryFn: async() => {
    const response = await axios.get("http://localhost:3000/getBorrowers")
    return response.data
  }
})
const {mutate:changeStatus} = useMutation({
  mutationFn:async({loanId,loanStatus})=>{
    let status
    
    const response = await axios.patch("http://localhost:3000/changeStatus",{status:loanStatus,loanId})
    return response
  },onSuccess:()=>{
    queryClient.invalidateQueries(["loans"])
    window.location.reload()
  }
})
const {mutate:addMoney} = useMutation({
  mutationFn: async({amount}) => {
    const response = await axios.patch("http://localhost:3000/addbalance",{userId,amount})
    return response.data
  }
})

const {mutate:addBorrowers} = useMutation({
  mutationFn:async({amount}) => {
    const response = await axios.patch("http://localhost:3000/changeBorrowed",{amount})
    return response.data
  }
})

const handleApprove = (loanAmount,user,loanId) => {
  addMoney({amount:loanAmount,userId:user})
  addBorrowers({amount: loanAmount})
  changeStatus({ loanId, loanStatus: "approved" });
}

const handleReject = (loanId) => {
  changeStatus({ loanId, loanStatus: "rejected" });
}

  return (
    <div className='verifier-dashboard'>
      <Navbar/>
      <div className="dashboard-grid">
      <div className='metric-card loans-container'>
        <h1>200</h1>
        <h1>ACTIVE USERS </h1>
      </div>
        <div className='metric-card loans-container'>
        <h1>{loans?.length}</h1>
        <h1>LOANS</h1>
      </div>
      <div className="metric-card borrowers-container">
        <h1>{getBorrowers?.length}</h1>
        <h1>BORROWERS</h1>
      </div>
      <div className="metric-card cash-distributed">
        <h1>
          {cashDetails?.cashBorrowed}
        </h1>
        <h1>CASH DISBURSED</h1>
      </div>
      <div className="metric-card savings-container">
        <h1>{cashDetails?.savings}</h1>
        <h1>SAVINGS</h1>
      </div>
      <div className="metric-card repaid-loan-container">
        <h1>{cashDetails?.repaidLoans}</h1>
        <h1>REPAID LOANS</h1>
      </div>
      <div className="metric-card cash-recieved-container">
        <h1>{cashDetails?.cashRecieved}</h1>
        <h1>CASH RECIEVED</h1>
      </div>
      <div className='metric-card loans-container'>
        <h1>10</h1>
        <h1>OTHER ACCOUNTS</h1>
      </div>
      </div>
      <div>
        Applied Loans
        <ul className="loan-list">
        <ul className="loan-list">
        <ul className="loan-list">
        <h2>Applied Loans</h2>
  {loans?.map((loan) => (
    <li key={loan._id} className="loan-item" >
      <div className="user-info">
        <div className="avatar">{loan.fullName?.[0]?.toUpperCase() || "?"}</div>
        <div>
          <p className="loan-reason">{loan.reason}</p>
          <p className="loan-amount">Loan Amount: ₹{loan.amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="customer-name">
        <p>{loan.fullName}</p>
        <p className="tenure">{loan.tenure} months</p>
      </div>

      <div className="date-info">
        <p>{new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}</p>
        <p className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      {loan.status === "verified" && (
       <div>
         <button onClick={() => handleApprove(loan.amount,loan.user,loan._id)}>Approve</button>
         <button onClick={() => handleReject(loan._id)}>Reject</button>
       </div>
      )}
        <button className={`status ${loan.status.toLowerCase()}`}>{loan.status}</button>
      
    </li>
  ))}
</ul>
        </ul>
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard
