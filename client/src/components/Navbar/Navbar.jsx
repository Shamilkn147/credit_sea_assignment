import React, { useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const role = user.role
  const fullName = user.fullName
  const navigate = useNavigate()
  const handleDropDown = () => {
    setIsOpen(!isOpen)
  }
  const handleLogout = (e) =>{
    e.preventDefault()
    localStorage.removeItem("user")
    navigate("/")
  }
   
  return (
    <div className="navbar">
        <div className='main-nav'>
           <h1>Credit app</h1>
            {(role === "verifier" || role === "admin") && 
          (<button className="drop-down-toggle" onClick={handleDropDown}>
                  ☰ Menu
                  </button>)}
        </div>
       {(role === "verifier" || role === "admin") &&(
          <div className="drop-down-container">
            <div className="drop-down-container">
              {isOpen && (
                <div className="dropdown-menu">
                  <h1>{fullName}</h1>
                  <p>Dashboard</p>
                  <p>Borrowers</p>
                  <p>Loans</p>
                  <p>Repayments</p>
                  <p>Loan Parameters</p>
                  <p>Accounting</p>
                  <p>Reports</p>
                  <p>Collateral</p>
                  <p>Access Configuration</p>
                  <p>Savings</p>
                  <p>Expenses</p>
                  <p>e-signature</p>
                  <p>Investor accounts</p>
                </div>
              )}
            </div>
          </div>
       )}

       {(role === "user") && (
        <div className="nav-buttons">
        <button>Home</button>
        <button>Payment</button>
        <button>Budget</button>
        <button>Card</button>
      </div>
       )}
            <div className="get-loan">
                <i><img className="icon-nav"src='https://img.icons8.com/?size=100&id=11642&format=png&color=000000'/></i>
                <i><img className="icon-nav" src='https://img.icons8.com/?size=100&id=SxDZAUXQeW2y&format=png&color=000000'/></i>
                <i>{fullName}</i>
                <i onClick={handleLogout}>logout</i>
            </div>
    </div>
  )
}

export default Navbar
