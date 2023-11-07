/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign.css'; // แน่ใจว่ามีไฟล์ CSS สำหรับหน้าล็อกอิน
import AuthService from '../services/auth.service';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    // สร้าง state เพื่อเก็บข้อมูลผู้ใช้
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const {login} =useAuthContext() ;

    const [loginSuccess, setLoginSuccess] = useState(false); // เพิ่ม state สำหรับการแจ้งเตือนเข้าสู่ระบบสำเร็จ
    // ฟังก์ชันเมื่อข้อมูลผู้ใช้เปลี่ยนแปลง
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleClick = async () => {
        try {
            //currentUser
            const currentUser = await AuthService.login(user.username, user.password);
            login(currentUser);
            navigate('/Profile');
            console.log('เข้าสู่ระบบสำเร็จ:');
            setLoginSuccess(true);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h2 className="text-center">Sign In</h2>
            {loginSuccess && ( // แสดงข้อความเมื่อเข้าสู่ระบบสำเร็จ
                <div className="alert alert-success form-label" role="alert">
                    เข้าสู่ระบบสำเร็จ!
                </div>
            )}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success form-control"
                        onClick={handleClick}
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
    );
};

export default Login;