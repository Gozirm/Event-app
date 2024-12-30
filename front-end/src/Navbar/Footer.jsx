import React from "react";
import whiteLogo from "../assets/logo-white.svg";
import "../Styles/Footer.css";
import facebook from "../assets/facebook.svg";
import IG from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import youtube from "../assets/youtube.svg";
const Footer = () => {
  return (
    <>
      <main className="footer">
        <div>
          <img src={whiteLogo} alt="" className="logo mb-3"loading="lazy" />
          <div className="d-md-flex justify-content-between">
            <div className="footer-section-1 mb-lg-0 mb-5">
              <p>
                Stay connected and informed with our updates Subscribe to our
                newsletter for the latest updates on mental health tips, app
                features, and exclusive offers. Join our community to receive
                valuable insights and support right in your inbox
              </p>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <button className="input-button">Submit</button>
              </div>
            </div>
            <div className="footer-ul-li ">
              <h1 className="footer-h1">Quick Links</h1>
              <ul className="list-unstyled d-flex row gap-3 m-0">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Events</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h1 className="footer-h1">Socials</h1>
              <a href="https://www.facebook.com">
                <img src={facebook} alt=""loading="lazy" />
              </a>
              <a href="https://www.instagram.com">
                <img src={IG} alt=""loading="lazy" />
              </a>
              <a href="https://www.twitter.com">
                <img src={twitter} alt=""loading="lazy" />
              </a>
              <a href="https://www.youtube.com">
                <img src={youtube} alt=""loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Footer;
