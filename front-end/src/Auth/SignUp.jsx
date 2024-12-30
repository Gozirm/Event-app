import React, { useState } from "react";
import signIpImg from "../assets/sign-up-frame.svg";
import logo from "../assets/Logo.svg";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../APIS/ValidationSchema";
import { useNavigate } from "react-router";
import Loader from "./Loader"; // Import the Loader component
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const [reveal, setReveal] = useState(false);
  const [image, setImage] = useState(eyeCLose);
  const [confirmReveal, setConfirmReveal] = useState(false);
  const [confirmImage, setConfirmImage] = useState(eyeCLose);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading state to true
    try {
      const res = await axios.post(
        "http://localhost:4090/api/users/sign-up",
        {
          email: data.email,
          fullname: data.username,
          password: data.password,
          confirmPassword: data.confirmPwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        toast(res.data.message)
        navigate("/sign-in");
      }
      console.log("Successful:", res.data);
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {isLoading && <Loader />} {/* Show loader when loading */}
      <main className="sign-up-in d-flex align-items-center justify-content-center gap-5">
        <img src={signIpImg} alt="" className="side-img d-none d-lg-block"loading="lazy" />
        <div className="side-img p-3 p-lg-0">
          <div className="mb-4 text-center">
            <img src={logo} alt={logo}loading="lazy" />
          </div>
          <div className="sign-up-form ">
            <h1>Create Account</h1>
            <p>
              Let’s get you started so you can start joining and creating events
            </p>
            <form
              action=""
              className="d-flex row gap-2 m-0 mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="email" placeholder="Email" {...register("email")} />
              <p className="p-0 m-0 text-danger">{errors.email?.message}</p>
              <input
                type="text"
                placeholder="Full Name"
                {...register("username")}
              />
              <p className="p-0 m-0 text-danger">{errors.username?.message}</p>
              <div className="pass p-0">
                <input
                  type={reveal ? "text" : "password"}
                  placeholder="Password"
                  className="w-100 pe-5"
                  {...register("password")}
                />
                <img onClick={handleReveal} src={image} className="pass-icon"loading="lazy" />
                <p className="p-0 m-0 text-danger">
                  {errors.password?.message}
                </p>
              </div>
              <div className="pass p-0">
                <input
                  type={confirmReveal ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-100 pe-5"
                  {...register("confirmPwd")}
                />
                <img
                  onClick={handleRevealConfirm}
                  src={confirmImage}
                  className="pass-icon"
                />
                <p className="p-0 m-0 text-danger">
                  {errors.confirmPwd?.message}
                </p>
              </div>
              <div className="d-flex align-items-center gap-1 p-0">
                <input type="checkbox" className="mb-3" />
                <p>I agree to the terms & conditions</p>
              </div>
              <button className="btn-sign-up w-100 p-0" type="submit">
                Sign Up
              </button>
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
