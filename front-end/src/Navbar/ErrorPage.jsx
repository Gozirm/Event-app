import React from "react";
import ErrorImg from "../assets/404.svg";
const ErrorPage = () => {
  return (
    <>
      <main className="d-flex row text-center align-items-center p-1 p-lg-0 w-100 justify-content-center">
        <img src={ErrorImg} alt="" className="w-auto"loading="lazy" />
        <div>
          <h2>Oh snap!, this is awkward.</h2>
          <p>
            But not as awkward as shaking someone that is to giving you a fist
            bump
          </p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
