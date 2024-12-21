import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import "../Styles/Navbar.css";
import { NavLink } from "react-router";
import dropdown from "../assets/dropdown.svg";
import profileImg from "../assets/profileImg.svg";
import Login from "./Login";
const Navbar = () => {
  const [isTrue, setisTrue] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const handledropdown = () => {
    if (isTrue) {
      setisTrue(false);
    } else {
      setisTrue(true);
    }
  };
  return (
    <>
      <main className="main-nav ">
        <div className=" d-md-flex d-none justify-content-between align-items-center  nav shadow-sm ">
          <NavLink to="/">
            <img src={Logo} alt="" className="logo" />
          </NavLink>
          <ul className="d-flex list-unstyled gap-4 navbar">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-nav-item" : "nav-item"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/event"
              className={({ isActive }) =>
                isActive ? "active-nav-item" : "nav-item"
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/create-events"
              className={({ isActive }) =>
                isActive ? "active-nav-item" : "nav-item"
              }
            >
              Create Event
            </NavLink>
          </ul>
          <div className={`d-flex ${isLoggedIn ? "d-none" : "d-block"} gap-4`}>
            <NavLink className="btn-sign-up text-decoration-none" to="/sign-up">
              Sign Up
            </NavLink>
            <NavLink className="btn-sign-in text-decoration-none" to="/sign-in">
              Sign In
            </NavLink>
          </div>
          <div className={`${isLoggedIn ? "d-block" : "d-none"}`}>
            <img src={profileImg} alt="" className="me-2 profile-img" />
            <img
              src={dropdown}
              alt=""
              className="dropdown-img"
              onClick={() => handledropdown()}
            />
            <div className="drop ">{isTrue && <Login />}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Navbar;
