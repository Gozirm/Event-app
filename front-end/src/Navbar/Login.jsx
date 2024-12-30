import React from "react";
import evnentImg from "../assets/calendar-range.svg";
import profileImg from "../assets/user-round-pen.svg";
import settingImg from "../assets/settings.svg";
import helpImg from "../assets/circle-help.svg";
import logoutImg from "../assets/log-out.svg";
import { useAuth } from "../Auth/AuthContext";
const Login = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <main className="animate__animated animate__backInDown">
        <div className="">
          <ul className="list-unstyled gap-2 m-0  d-flex row justify-content-between">
            <li className="drop-items">
              <img src={evnentImg} alt=""loading="lazy" /> Your Event
            </li>
            <hr className="m-0" />
            <li className="drop-items">
              <img src={profileImg} alt=""loading="lazy" /> Profile
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
            <li className="drop-items" onClick={logout}>
              <a href="/" className="text-decoration-none">
                <img src={logoutImg} alt=""loading="lazy" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Login;
