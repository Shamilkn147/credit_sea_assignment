import React from 'react'
import Application from './components/Application/Application'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserDashboard from './components/Dasdboard/UserDashboard'
import VerifierDashboard from './components/Dasdboard/VerifierDashboard'
import AdminDashboard from './components/Dasdboard/AdminDashboard'
import Auth from './components/Auth/Auth'


const App = () => {
  const me = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <BrowserRouter>
        <Routes>
      <Route path='/' element={
        <Auth/>
      }/>
      <Route path='/navbar' element={<Navbar/>}/>
      <Route path='/verifierDashboard' element={<VerifierDashboard/>}/>
      <Route path='/application' element={<Application/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/userDashboard" element={<UserDashboard/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
