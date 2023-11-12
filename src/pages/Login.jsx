/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import axios from  "../services/api";
import { useNavigate } from 'react-router-dom';
import './sign.css'; 
import AuthService from '../services/auth.service';
import { useAuthContext } from '../context/AuthContext';

import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuthContext();  
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleLogin = async () => {
        try {
            const currentUser = await AuthService.login(user.username, user.password);
            login(currentUser);
            Swal.fire({
                icon: 'success',
                title: 'Login Successfully !',
                showConfirmButton: false,
                timer: 1500, // 
            });
    
            navigate('/Profile');
        } catch (error) {
            console.error('Login Failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed !',
                text: error.message,
            });
        }
    };
    

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
             <h2 className="text-center">LogIn</h2>
            <div className="card_login">
           
            <form className="container-sm">
            
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            ชื่อผู้ใช้:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            รหัสผ่าน:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success form-control"
                        onClick={handleLogin}
                    >
                        เข้าสู่ระบบ
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger form-control"
                        onClick={handleCancel}
                    >
                        ยกเลิก
                    </button>
                </div>
                
            </form>
            </div>
            </div>
      
    );
};

export default Login;