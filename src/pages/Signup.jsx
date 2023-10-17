/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sign.css";
import AuthService from "../services/auth.service";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage ] = useState({ message: ""});
  // สร้าง state เพื่อเก็บข้อมูลผู้ใช้
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // เพิ่ม state สำหรับการแจ้งเตือนการลงทะเบียนสำเร็จ

  // ฟังก์ชันเมื่อข้อมูลผู้ใช้เปลี่ยนแปลง
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,[name]: value,
    });
  };

  const handleClick = async () => {
    try {
      if(user.confirmPassword === user.password){
        const register = await AuthService.register(user.username,user.email,user.confirmPassword);
        navigate("/login");
      }else{
       setError(true);
       setErrorMessage({ message:"Failed! Password mismathched !"});
      }
      const response = await axios.post(`${URL}/register`, user, config);
      console.log("ลงทะเบียนเสร็จสิ้น :", response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลงทะเบียน:", error);
      setError(true);
      setErrorMessage(error.response.data);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-center"> สมัครบัญชีผู้ใช้งานใหม่ </h2>
      <div className="error">{error && errorMessage.message}</div>
      {registrationSuccess && ( // แสดงข้อความเมื่อลงทะเบียนสำเร็จ
        <div className="alert alert-success form-label" role="alert">
          {" "}
          ลงทะเบียนสำเร็จ{" "}
        </div>
      )}
      <form className="container-sm">
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label"> ชื่อผู้ใช้: </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"> อีเมล: </label>
            <input type="email"
              className="form-control"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"> รหัสผ่าน: </label>
            <input type="password"
              className="form-control"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">  ยืนยันรหัสผ่าน:  </label>
            <input  type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputChange}
              required />
          </div>
        </div>

        <div className="d-grid gap-2">
          <button type="button"
            className="btn btn-success form-control"
            onClick={handleClick}> ลงทะเบียน </button>
          <button type="button"
            className="btn btn-danger form-control"
            onClick={handleCancel}> ยกเลิก </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
