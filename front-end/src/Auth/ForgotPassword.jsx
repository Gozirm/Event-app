import React from "react";
import signIpImg from "../assets/sign-in-frame.svg";
import logo from "../assets/Logo.svg";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
const ForgotPassword = () => {
  return (
    <>
      <main className="sign-up-in d-flex align-items-center justify-content-center gap-5">
        <div className="side-img p-3 p-lg-0">
          <div className="mb-4 text-center">
            <img src={logo} alt={logo}loading="lazy" />
          </div>
          <div className="sign-up-form ">
            <h1>Forgot Password?</h1>
            <p>No worries, we’ll send you instruction to help</p>
            <form action="" className="d-flex row gap-3 m-0 mt-4">
              <input type="email" placeholder="Email" name="" id="" />

              <button className="btn-sign-up w-100 p-0">Reset Password</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
