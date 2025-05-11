import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import "./VerifiedDashboard.css"
import Navbar from '../Navbar/Navbar'

const VerifierDashboard = () => {
  const queryClient = useQueryClient()

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
    const response = await axios.get("https://credit-sea-assignment-6eav.onrender.com/getDetails")
    return response.data[0]
  }
})


const {data:getBorrowers} = useQuery({
  queryKey:["getBorrowers"],
  queryFn: async() => {
    const response = await axios.get("https://credit-sea-assignment-6eav.onrender.com/getBorrowers")
    return response.data
  }
})

const {mutate:changeStatus} = useMutation({
  mutationFn:async({loanId,loanStatus})=>{
    let status
    if(loanStatus === "pending"){
      status = "verified"
    }
    const response = await axios.patch("https://credit-sea-assignment-6eav.onrender.com/changeStatus",{status,loanId})
    return response
  },onSuccess:()=>{
    queryClient.invalidateQueries["loans"]
  }
})

  return (
    <div className='verifier-dashboard'>
      <Navbar/>
      <div className="dashboard-grid">
        
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
      </div>
      <div>
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

      <div className="status-info">
        <button className={`status ${loan.status.toLowerCase()}`}onClick={()=>changeStatus({loanId:loan._id,loanStatus:loan.status})}>{loan.status}</button>
      </div>
    </li>
  ))}
</ul>
        </ul>
      </div>
    </div>
  )
}

export default VerifierDashboard
