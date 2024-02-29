import React from "react";
import "./style.css";
import android from "../Footer/assets/playstore.png";
import ios from "../Footer/assets/app-store.png";
import logo from "../Footer/assets/by-logo-white.svg";
import ig from "../Footer/assets/ig.png";
import x from "../Footer/assets/x.png";
import yt from "../Footer/assets/youtube.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer>
        <div className="left_footer">
          <h1>DOWNLOAD OUR APP</h1>
          <p>Download App for android and IOS smartphone!</p>
          <div className="download">
            <img className="android" src={android} alt="" />
            <img className="ios" src={ios} alt="" />
          </div>
        </div>
        <div className="mid_footer">
          <img src={logo} alt="" />
          <p>Get what you crave for! </p>
          <p>Copyright 2024 &copy; parthtiwar_i</p>
        </div>
        <div className="right_footer">
          <h1>Follow us on </h1>
          <div className="social">
            <Link to={"https://www.instagram.com/parthtiwar_i/"} >
              <img className="social_icon" src={ig} alt="" />
            </Link>
            <Link to={"https://twitter.com/parthtiwar_i"} >
              <img className="social_icon" src={x} alt="" />
            </Link>
            <Link>
              <img className="social_icon" src={yt} alt="" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
