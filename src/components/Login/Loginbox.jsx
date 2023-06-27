import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../utils/config";

import { useUserStore } from '../store'

//🐼redirecting
import {useContext} from 'react';
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router";

const Loginbox = () => {
    {/*🐼 userData 담아서 다른 컴포턴트와 공유할 수 있는 hook*/}
    const { user, setUser } = useContext(UserContext);

    {/* 디라이렉팅 관련 hook */}
    const navigate = useNavigate();
    const location = useLocation();


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: ''
    });

    const { email, password, error } = formData;

    // {/* 🌿 store에 있는 함수를 불러옵니다. */}
    const setUserEmail = useUserStore(state => state.setUserEmail)
    const setUserName  = useUserStore(state => state.setUserName)

    // console.log(formData); //🔥 testing
    
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (user.loggedIn) return navigate('/main');   //🐼로그인 상태라면 함수 종료
        
        if (location.state?.from) {navigate(location.state.from);}; //로그인안해서 된거면 원래 page로 리다이렉팅 
        
        axios.post(`${API.LOGIN}`, {
            email,
            password
        }, {
            withCredentials: true
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                // {/* 🌿 post 성공한다면 email값을 store에 저장합시다. */}
                setUserEmail(formData.email)
                setUserName(res.data.user.name)
                setUser({ loggedIn: true });
                
                navigate('/main');
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
