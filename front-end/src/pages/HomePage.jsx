import React from "react";
import "../Styles/HomePage.css";
import { NavLink } from "react-router";
import { useAuth } from "../Auth/AuthContext";
const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <main className="home-page-bg d-flex align-items-center">
        <div className="container p-0 title ">
          <h1>Discover Unforgettable Experiences With Ease </h1>
          <p>
            "Find, book, and manage tickets for concerts, workshops, and social
            gatherings with ease. Create events, connect with your audience, and
            start making lasting memories today!"
          </p>
          {user ? (
            <div></div>
          ) : (
            <NavLink to="/sign-up">
              <button>Sign Up</button>
            </NavLink>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
