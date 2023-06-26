import React, { useState } from "react";
import axios from "axios";
import { API } from "../../utils/config";
import { useNavigate } from 'react-router-dom';

const Loginbox = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: ''
    });

    const { email, password, error } = formData;

    // console.log(formData); //🔥 testing
    
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`${API.LOGIN}`, {
            email,
            password
        }, {
            withCredentials: true
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem('userName', JSON.stringify(res.data.user.name));
                localStorage.setItem('userEmail', JSON.stringify(res.data.user.email));
                navigate('/Main');
            }
        })
        .catch(err => {
            setFormData({ ...formData, error: "Failed to login. Please check your email or password." });
        });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">

                <img src="/logo.png" alt="logo" className="h-20 w-auto center" />

                <h1 className="text-4xl font-semibold text-center text-purple-700">
                    Log in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email</label>
                        <input type="email" onChange={handleChange('email')} value={email} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
                        <input type="password" onChange={handleChange('password')} value={password} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <a href="/forgotpw" className="text-xs text-purple-600 hover:underline">Forget Password?</a>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">Login</button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-purple-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Loginbox;
