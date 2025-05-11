import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
    const { mutate: loginMutate, isPending } = useMutation({
        mutationFn: async ({ email, password }) => {
            const response = await axios.post("http://localhost:3000/login", { 
                email, 
                password 
            });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Login success:", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            setErrorMessage(""); // Clear any errors
            if(data.user.role === "user"){
                navigate("/userDashboard")
            }else if(data.user.role === "verifier"){
                navigate("/verifierDashboard")
            }else if(data.user.role === "admin"){
                    navigate("/adminDashboard")
                }
        },
        onError: (error) => {
            console.error("Login error:", error);
            setErrorMessage(
                error.response?.data?.message || 
                error.message || 
                "Login failed. Please try again."
            );
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage("Please enter both email and password");
            return;
        }
        loginMutate({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />
            <button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
            </button>
            
            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {errorMessage}
                </div>
            )}
        </form>
    );
};

export default Login;