import React from "react";
import signIpImg from "../assets/sign-in-frame.svg";
import logo from "../assets/Logo.svg";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
const SignIn = () => {
  const [reveal, setReveal] = useState(false);
  const [image, setImage] = useState(eyeCLose);

  function handleReveal() {
    setReveal(!reveal);
    setImage(reveal ? eyeCLose : eyeOpen);
  }
  return (
    <>
      <main className="sign-up-in d-flex align-items-center justify-content-center gap-5">
        <img src={signIpImg} alt="" className="side-img d-none d-lg-block" />
        <div className="side-img p-3 p-lg-0">
          <div className="mb-4 text-center">
            <img src={logo} alt={logo} />
          </div>
          <div className="sign-up-form ">
            <h1>Create Account</h1>
            <p>Sign In To Your Account</p>
            <form action="" className="d-flex row gap-3 m-0 mt-4">
              <input type="email" placeholder="Email" name="" id="" />
              <div className="pass p-0">
                <input
                  type={reveal ? "text" : "password"}
                  placeholder="Password"
                  name=""
                  id=""
                  className="w-100 pe-5"
                />
                <img onClick={handleReveal} src={image} className="pass-icon" />
              </div>

              <a
                className="p-0 text-dark text-decoration-none fw-bold"
                href="/forgot-password"
              >
                Forgot Password?
              </a>
              <button className="btn-sign-up w-100 p-0">Sign In</button>
            </form>
            <p className="d-flex align-items-center justify-content-start m-0">
              Dont have an account?{" "}
              <a href="/sign-up" className="ms-2 a-tag">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
