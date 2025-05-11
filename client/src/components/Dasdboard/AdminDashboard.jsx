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
        const response = await axios.get("https://credit-sea-assignment-6eav.onrender.com/getLoans")
        return response.data
    },onSuccess:(data)=>{
     console.log()
    }
})


const {data:cashDetails} = useQuery({
  queryKey:["cashDetails"],
  queryFn:async()=>{
    const response = await axios.get("https://credit-sea-assignment-6eav.onrender.comgetDetails")
    return response.data[0]
  }
})


const {data:getBorrowers} = useQuery({
  queryKey:["getBorrowers"],
  queryFn: async() => {
    const response = await axios.get("https://credit-sea-assignment-6eav.onrender.comgetBorrowers")
    return response.data
  }
})
const {mutate:changeStatus} = useMutation({
  mutationFn:async({loanId,loanStatus})=>{
    const response = await axios.patch("https://credit-sea-assignment-6eav.onrender.com/changeStatus",{status:loanStatus,loanId})
    return response
  },onSuccess:()=>{
    queryClient.invalidateQueries(["loans"])
  }
})
const {mutate:addMoney} = useMutation({
  mutationFn: async({amount}) => {
    const response = await axios.patch("https://credit-sea-assignment-6eav.onrender.com/addbalance",{userId,amount})
    return response.data
  }
})

const {mutate:addBorrowers} = useMutation({
  mutationFn:async({amount}) => {
    const response = await axios.patch("https://credit-sea-assignment-6eav.onrender.com/changeBorrowed",{amount})
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
        <div className='first-row'>
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
      </div>
      <div className='first-row'>
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
      </div>
      <div>
        <table className="loan-table">
  <thead>
    <tr>
      <th>Avatar</th>
      <th>Reason</th>
      <th>Customer Name</th>
      <th>Tenure</th>
      <th>Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {loans?.map((loan) => (
      <tr key={loan._id}>
        <td>
          <div className="avatar">{loan.fullName?.[0]?.toUpperCase() || "?"}</div>
        </td>
        <td>
          <p className="loan-reason">{loan.reason}</p>
          <p className="loan-amount">Loan Amount: ₹{loan.amount.toLocaleString()}</p>
        </td>
        <td>{loan.fullName}</td>
        <td>{loan.tenure} months</td>
        <td>
          <p>{new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</p>
          <p className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </td>
        <td>
          <button className={`status ${loan.status.toLowerCase()}`}>{loan.status}</button>
        </td>
        <td className='action-buttons'>
          {loan.status === "verified" && (
            <>
              <button onClick={() => handleApprove(loan.amount, loan.user, loan._id)}>Approve</button>
              <button onClick={() => handleReject(loan._id)}>Reject</button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  )
}

export default AdminDashboard
