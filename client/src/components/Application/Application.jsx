import React, { useState } from 'react'
import "./Application.css"
import { useMutation } from '@tanstack/react-query'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Application = () => {


    const [amount, setAmount] = useState(0)
    const [tenure, setTenure] = useState(0)
    const [employment, setEmployment] = useState("")
    const [reason, setReason] = useState("")
    const [employmentAddress, setEmploymentAddress] = useState("")
    const [agreeTerms,setAgreeTerms] = useState(false)
    const [disclosure,setDisclosure] = useState(false)

    const userId = JSON.parse(localStorage.getItem("user"))
    const user = userId._id
    const [fullName, setFullName] = useState(userId.fullName)
    const navigate = useNavigate()
    
    const {mutate:application, isError, isPending,error} = useMutation({
        mutationFn:async() => {
            const response = await axios.post("http://localhost:3000/loanApply",{
                user,
                fullName,
                amount,
                tenure,
                employment,
                reason,
                employmentAddress
            })
            return response.data
        },onSuccess:(data)=>{
            setAgreeTerms(false)
            setAmount(0)
            setDisclosure(false)
            setEmployment("")
            setEmploymentAddress("")
            setReason("")
            setTenure(0)
            setFullName("")
            navigate(-1)
        }
    })


    const handleSubmit =  (e) => {
        e.preventDefault()
        application()
    }
  return (
      <form onSubmit={handleSubmit}>
        <h2>APPLY FOR A LOAN</h2>
        <div>
            <div>
                <label>Full name as it appears on bank account</label>
                <input 
                    type='text' 
                    placeholder='Full name as it appears on bank account' 
                    value={fullName} 
                    onChange={(e)=> setFullName(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>How much do you need?</label>
                <input 
                    type='number' 
                    placeholder='How much do you need?' 
                    value={amount} 
                    onChange={(e)=> setAmount(Number(e.target.value))} 
                    required
                />
            </div>
            <div>
                <label>Loan tenure (in months)</label>
                <input 
                    type='number' 
                    placeholder='Loan tenure (in months)' 
                    value={tenure} 
                    onChange={(e)=> setTenure(Number(e.target.value))} 
                    required
                />
                
            </div>
            <div>
                <label>Reason for Loan</label>
                <input 
                    type='text' 
                    placeholder='Reason for Loan' 
                    value={reason} 
                    onChange={(e)=> setReason(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>Employement Status</label>
                <input 
                    type='text' 
                    placeholder='Employement Status' 
                    value={employment} 
                    onChange={(e)=> setEmployment(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>Employement Address</label>
                <input 
                    type='text' 
                    placeholder='Employement Address' 
                    value={employmentAddress} 
                    onChange={(e)=> setEmploymentAddress(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>
                <input 
                    type='checkbox'  
                    checked={agreeTerms} 
                    onChange={(e)=> setAgreeTerms(e.target.checked)} 
                    required
                />
                i have read the important information and accept that by completing the application I will be bound by the terms 
                </label>
            </div>
            <div>
                <label>
                <input 
                    type='checkbox' 
                    placeholder='Employement Status' 
                    checked={disclosure} 
                    onChange={(e)=> setDisclosure(e.target.checked)} 
                    required
                />
                Any personal and credit information obtained may be disclosed from time to time to other lenders, credit bureaus or other credit reporting agencies. 
                </label>
            </div>
            <button type='submit'>submit</button>
        </div>
      </form>
        )
}

export default Application
