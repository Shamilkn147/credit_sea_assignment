import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import "./Aut.css"

const Auth = () => {
    const [tab,setTab] = useState("login")
  return (
    <div>
     <div className="button-container">
        <button onClick={()=>setTab("login")}>login</button>
        <button onClick={()=>setTab("register")}>register</button>
     </div>
     <div>
        {tab==="login"? (
            <Login/>
        ):(
            <Register/>
        )}
     </div>
    </div>
  )
}

export default Auth
