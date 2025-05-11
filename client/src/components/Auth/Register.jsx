import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Register.css"

const Register = () => {
    const [fullName,setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectOption, setSelecterdOption] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const roles = ["user","verifier","admin"]
    const navigate = useNavigate()
    const {mutate:register} = useMutation({
        mutationFn:async() => {
            const response = await axios.post("https://credit-sea-assignment-6eav.onrender.com/register",{
                fullName,
                email,
                password,
                role:selectOption
            })
            return response.data
        },
        onSuccess:(data)=>{
            console.log(data.user)
            setFullName("")
            setEmail("")
            setPassword("")
            setSelecterdOption(null)
            localStorage.setItem("user",JSON.stringify(data.user))
            if(data.user.role === "user"){
                navigate("/userDashboard")
            }else if(data.user.role === "verifier"){
                navigate("/verifierDashboard")
            }else if(data.user.role === "admin"){
                navigate("/adminDashboard")
            }
        }
    })

    const toggleDropDown = () => setIsOpen(!isOpen)
    const handleOption = (option) => {
        setSelecterdOption(option)
        setIsOpen(!isOpen)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register()
    }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input 
            placeholder='enter your full name'
            value={fullName}
            type='text'
            onChange={(e)=>setFullName(e.target.value)}
            required
        />
        <input 
            placeholder='enter your email'
            value={email}
            type='email'
            onChange={(e)=>setEmail(e.target.value)}
            required
        />
        <input 
            placeholder='enter your password'
            value={password}
            type='password'
            onChange={(e)=>setPassword(e.target.value)}
            required
        />
        <div>
        <button className="dropdown-toggle" onClick={toggleDropDown} type='button'>
            {selectOption || "select a role"}
        </button>
        {isOpen && (
            <ul>
                {roles?.map((role)=>(
                    <li onClick={()=>handleOption(role)}>{role}</li>
                ))}
            </ul>
        )}
        </div>
        <button type='submit' className='submit-btn'>Register</button>
      </form>
    </div>
  )
}

export default Register
