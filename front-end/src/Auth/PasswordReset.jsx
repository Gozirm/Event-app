import React from "react";
import logo from "../assets/Logo.svg";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
const PasswordReset = () => {
  const [reveal, setReveal] = useState(false);
  const [image, setImage] = useState(eyeCLose);
  const [confirmReveal, setConfirmReveal] = useState(false);
  const [confirmImage, setConfirmImage] = useState(eyeCLose);

  function handleRevealConfirm() {
    setConfirmReveal(!confirmReveal);
    setConfirmImage(confirmReveal ? eyeCLose : eyeOpen);
  }

  function handleReveal() {
    setReveal(!reveal);
    setImage(reveal ? eyeCLose : eyeOpen);
  }
  return (
    <>
      <main className="sign-up-in d-flex align-items-center justify-content-center gap-5">
        <div className="side-img p-3 p-lg-0">
          <div className="mb-4 text-center">
            <img src={logo} alt={logo}loading="lazy" />
          </div>
          <div className="sign-up-form ">
            <h1>Reset Password</h1>
            <p>
            Enter Your New Password
            </p>
            <form action="" className="d-flex row gap-3 m-0 mt-4">
            
              <div className="pass p-0">
                <input
                  type={reveal ? "text" : "password"}
                  placeholder="Password"
                  name=""
                  id=""
                  className="w-100 pe-5"
                />
                <img onClick={handleReveal} src={image} className="pass-icon"loading="lazy" />
              </div>
              <div className="pass p-0">
                <input
                  type={confirmReveal ? "text" : "password"}
                  placeholder="Confirm Password"
                  name=""
                  id=""
                  className="w-100 pe-5"
                />
                <img
                  onClick={handleRevealConfirm}
                  src={confirmImage}
                  className="pass-icon"
                />
              </div>
             
              <button className="btn-sign-up w-100 p-0">Reset Password</button>
            </form>
          
          </div>
        </div>
      </main>
    </>
  );
};

export default PasswordReset;
