import React from "react";
import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import logo from "../assets/Logo.svg";
import menuIcon from "../assets/menu.svg";
import profileImg from "../assets/profileImg.svg";
import { useAuth } from "../Auth/AuthContext";
import { NavLink } from "react-router";
import evnentImg from "../assets/calendar-range.svg";
import profileIcon from "../assets/user-round-pen.svg";
import settingImg from "../assets/settings.svg";
import helpImg from "../assets/circle-help.svg";
import logoutBtn from "../assets/log-out.svg";
const OffcanvasNavbar = ({ name, ...props }) => {
  const { user, logout } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <main className="nav d-md-none">
        <div className="d-flex justify-content-between w-100">
          <img src={logo} alt=""loading="lazy" />
          <img src={menuIcon} alt="" onClick={handleShow}loading="lazy" />
        </div>
        {user ? (
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="start"
            {...props}
            style={{ width: "60%" }}
          >
            <Offcanvas.Header>
              <Offcanvas.Title>
                {" "}
                <main className="d-flex justify-content-between align-items-center gap-3">
                  <img src={user?.profileImg} alt="" className="w-25 mb-2"loading="lazy" />
                  <p className="">Hello {user?.fullname}</p>
                  <NavLink onClick={logout} to="/" className="mb-3">
                    <img src={logoutBtn} alt=""loading="lazy" />
                  </NavLink>
                </main>
                <hr className="m-0" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <main>
                <ul className="d-flex row m-0  list-unstyled gap-4 navbar">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active-nav-item" : "nav-item"
                    }
                    onClick={handleClose}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/event"
                    className={({ isActive }) =>
                      isActive ? "active-nav-item" : "nav-item"
                    }
                    onClick={handleClose}
                  >
                    Events
                  </NavLink>
                  <NavLink
                    to="/create-events"
                    className={({ isActive }) =>
                      isActive ? "active-nav-item" : "nav-item"
                    }
                    onClick={handleClose}
                  >
                    Create Event
                  </NavLink>
                </ul>
                <hr className="mt-2" />
                <div className="mt-4">
                    <ul className="list-unstyled gap-2 m-0  d-flex row justify-content-between">
                      <li className="drop-items">
                        <img src={evnentImg} alt=""loading="lazy" /> Your Event
                      </li>
                      <hr className="m-0" />
                      <li className="drop-items">
                        <img src={profileIcon} alt=""loading="lazy" /> Profile
                      </li>
                      <hr className="m-0" />
                      <li className="drop-items">
                        <img src={settingImg} alt=""loading="lazy" /> Settings
                      </li>
                      <hr className="m-0" />
                      <li className="drop-items">
                        <img src={helpImg} alt=""loading="lazy" /> Help
                      </li>
                      <hr className="m-0" />
                    </ul>
                  </div>
              </main>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="start"
            {...props}
            style={{ width: "60%" }}
          >
            <Offcanvas.Header>
              <Offcanvas.Title>
                <main>
                  <ul className="d-flex row m-0  list-unstyled gap-4 navbar">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "active-nav-item" : "nav-item"
                      }
                      onClick={handleClose}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/event"
                      className={({ isActive }) =>
                        isActive ? "active-nav-item" : "nav-item"
                      }
                      onClick={handleClose}
                    >
                      Events
                    </NavLink>
                    <NavLink
                      to="/create-events"
                      className={({ isActive }) =>
                        isActive ? "active-nav-item" : "nav-item"
                      }
                      onClick={handleClose}
                    >
                      Create Event
                    </NavLink>
                  </ul>
                  <hr className="m-0" />

                
                </main>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="mb-3">
                <ul className="list-unstyled gap-2 m-0  d-flex row justify-content-between">
                  <li className="drop-items">
                    <img src={evnentImg} alt=""loading="lazy" /> Your Event
                  </li>
                  <hr className="m-0" />
                  <li className="drop-items">
                    <img src={profileIcon} alt=""loading="lazy" /> Profile
                  </li>
                  <hr className="m-0" />
                  <li className="drop-items">
                    <img src={settingImg} alt=""loading="lazy" /> Settings
                  </li>
                  <hr className="m-0" />
                  <li className="drop-items">
                    <img src={helpImg} alt=""loading="lazy" /> Help
                  </li>
                  <hr className="m-0" />
                </ul>
              </div>
              <hr />
              <div className={`d-flex row w-100 m-0 gap-4`}>
                <NavLink
                  className="btn-sign-up w-100 text-decoration-none"
                  to="/sign-up"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  className="btn-sign-in w-100 text-decoration-none"
                  to="/sign-in"
                >
                  Sign In
                </NavLink>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        )}
      </main>
    </>
  );
};

export default OffcanvasNavbar;
