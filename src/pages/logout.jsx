import React from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Logout() {
    const navigate = useNavigate();
    const handlelogout = () =>{
        AuthService.logout();
        navigate("/");
    }
    setTimeout(() => {
        handlelogout();
    }, 3* 1000);
  return 
    <div>Logout</div>;
  };

export default Logout;
