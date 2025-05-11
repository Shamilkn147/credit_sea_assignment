import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios from "axios"
import Navbar from '../Navbar/Navbar'
import "./UserDashboard.css"
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
    const [searchItem, setSearchItem] = useState("")
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user._id

    const {data:loans,isError,error} = useQuery({
        queryKey:["loans"],
        queryFn:async()=>{
            const response = await axios.get("https://credit-sea-assignment-6eav.onrender.com/getLoans")
            return response.data
        }
    })

    const {data:getUsers} = useQuery({
      queryKey:["getUsers"],
      queryFn:async()=>{
        const response = await axios.get("https://credit-sea-assignment-6eav.onrender.com/getUsers")
        return response.data
      }
    })

    const userFiltered = getUsers?.filter(user => user._id === userId)[0]
    // console.log(userFiltered)

    const preFiltered = loans?.filter(loan => loan.user === userId)
    
    const filteredData = preFiltered?.filter(item => {
        return String(item?.amount)?.includes(searchItem);
    });

    
  return (
    <div>
      <Navbar/>
      <div className="dashboard-header">
        <div>
        <p>defecit</p>
        <h2>{userFiltered?.balance}</h2>
        <h1>cash</h1>
        </div>
        <button onClick={()=>navigate("/application")}>Get a loan</button>
      </div>
      <div>
        <input 
            placeholder='search for loans'
            value={searchItem}
            onChange={e => setSearchItem(e.target.value)}
            type='search'
        />
        {searchItem && (
            <button onClick={()=>setSearchItem("")}>
                X
            </button>
        )}
      </div>
      <div className="results-container">
            {filteredData?.length > 0? 
            (
                <table className="loan-table">
  <thead>
    <tr>
      <th>Full Name</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    {filteredData?.length > 0 ? (
      filteredData.map((item, index) => (
        <tr key={index}>
          <td>{item.fullName}</td>
          <td>{item.amount}</td>
          <td>
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </td>
          <td>{item.reason}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" style={{ textAlign: 'center' }}>No results found</td>
      </tr>
    )}
  </tbody>
</table>

            ):(<p>no results found</p>)}
        </div>
    </div>
  )
}

export default UserDashboard
