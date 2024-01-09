import React from "react";
import "./style.css";
import android from '../Footer/assets/android.png'
import ios from '../Footer/assets/ios.png'
import logo from '../Footer/assets/by-logo-white.svg'
import ig from '../Footer/assets/ig.png'
import x from '../Footer/assets/x.png'
import yt from '../Footer/assets/youtube.png'

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
          <p>Get what  you crave for! </p>
          <p>Copywrite 2024 &copy; parthtiwar_i</p>
        </div>
        <div className="right_footer">
          <h1>Follow us on </h1>
          <div className="social">
          <img className="social_icon" src={ig} alt="" />
          <img className="social_icon" src={x} alt="" />
          <img className="social_icon" src={yt} alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
