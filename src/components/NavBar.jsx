import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  //console.log(user.username);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/Login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-md">
        <Link className="navbar-brand" to="/">
          Grab Restaurant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            {user && user.roles.includes("ROLES_ADMIN") && (
              <Link className="nav-link" to="/Add">
                AddMenu
              </Link>
            )}

            {user && (
              <Link className="nav-link" to="/Profile">
                ProFile
              </Link>
            )}

            <li className="nav-item">
              <Link className="nav-link " to="/search">
                Search
              </Link>
            </li>
          </ul>

          <form>
            {!user && (
              <button className="btn btn-outline-warning NotoSansThai-Regular">
                <Link className="nav-link" to="/Signup">
                  Signup
                </Link>
              </button>
            )}
            {!user && (
              <button className="btn btn-outline-warning NotoSansThai-Regular">
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              </button>
            )}

            {user && (
              <button
                className="btn btn-outline-warning NotoSansThai-Regular"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            {user && (
              <div className="navbar-text NotoSansThai-Regular">
                ยินดีต้อนรับ, {user.username}
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
