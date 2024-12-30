import React, { useState } from "react";
import signIpImg from "../assets/sign-in-frame.svg";
import logo from "../assets/Logo.svg";
import eyeOpen from "../assets/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import eyeCLose from "../assets/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../APIS/ValidationSchema";
import Loader from "../Auth/Loader.jsx";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext.jsx";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [reveal, setReveal] = useState(false);
  const [image, setImage] = useState(eyeCLose);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4090/api/users/sign-in",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Include userId in the login data
        login({
          _id: res.data.user._id, // Assuming the user object contains an _id field
          fullname: res.data.user.fullname,
          profileImg: res.data.user.profileImage,
        });
        localStorage.setItem("mubby-event-token", res.data.user.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Store the user data in local storage
        navigate("/");
        console.log("Login successful:", res.data);
      } else {
        toast.error(res.data.errMsg || "User  not found");
      }
    } catch (error) {
      console.error("Error during sign in:", error);

      if (error.response) {
        toast.error(
          error.response.data.message || "An error occurred during sign in."
        );
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  function handleReveal() {
    setReveal(!reveal);
    setImage(reveal ? eyeCLose : eyeOpen);
  }

  return (
    <>
      {isLoading && <Loader />}
      <main className="sign-up-in d-flex align-items-center justify-content-center gap-5">
        <img
          src={signIpImg}
          alt=""
          className="side-img d-none d-lg-block"
          loading="lazy"
        />
        <div className="side-img p-3 p-lg-0">
          <div className="mb-4 text-center">
            <img src={logo} alt={logo} loading="lazy" />
          </div>
          <div className="sign-up-form ">
            <h1>Welcome Back</h1>
            <p>Sign In To Your Account</p>
            <form
              action=""
              className="d-flex row gap-3 m-0 mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="email" placeholder="Email" {...register("email")} />
              <p className="p-0 m-0 text-danger">{errors.email?.message}</p>
              <div className="pass p-0 ">
                <input
                  type={reveal ? "text" : "password"}
                  placeholder="Password"
                  className="w-100 pe-5"
                  {...register("password")}
                />
                <img
                  onClick={handleReveal}
                  src={image}
                  className="pass-icon"
                  loading="lazy"
                />
              </div>
              <p className="p-0 m-0 text-danger">{errors.password?.message}</p>

              <a
                className="p-0 text-dark text-decoration-none text-decoration-underline"
                href="/forgot-password"
              >
                Forgot Password?
              </a>
              <button className="btn-sign-up w-100 p-0">Sign In</button>
            </form>
            <p className="d-flex align-items-center justify-content-start m-0">
              Don't have an account?{" "}
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
