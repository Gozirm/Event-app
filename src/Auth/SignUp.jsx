import React from "react";
import signIpImg from "../assets/sign-up-frame.svg";
import logo from "../assets/Logo.svg";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
const SignUp = () => {
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
        <img src={signIpImg} alt="" className="side-img d-none d-lg-block" />
        <div className="side-img p-3 p-lg-0">
          <div className="mb-4 text-center">
            <img src={logo} alt={logo} />
          </div>
          <div className="sign-up-form ">
            <h1>Welcome Back</h1>
            <p>
              Let’s get you started so you can start joining and creating events
            </p>
            <form action="" className="d-flex row gap-3 m-0 mt-4">
              <input type="email" placeholder="Email" name="" id="" />
              <input type="text" placeholder="Full Name" name="" id="" />
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
              <div className="d-flex align-items-center gap-1 p-0">
                <input type="checkbox" name="" id="" className="mb-3" />
                <p>I agree to the terms & conditions</p>
              </div>
              <button className="btn-sign-up w-100 p-0">Sign Up</button>
            </form>
            <p className="d-flex align-items-center justify-content-start m-0">
              Already have an account?{" "}
              <a href="/sign-in" className="ms-2 a-tag">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
