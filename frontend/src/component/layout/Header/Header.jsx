import React, { useState } from "react";
import "./style.css";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "./assets/by-logo-white.svg";
import search from './assets/search_icon.png'
import cart from './assets/shopping-carts.png'
import user from './assets/user_acc.png'
const links = ["Home", "Product", "About", "Contact"];

const Header = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isOpen = isMenuOpen ? "open" : "";

  const onClick = (href) => {
    toggleMenu();
    navigate(href);
  };

  return (
    <div className="navbar">
      <div className="hamburger">
        <div className="hamburger_function">
          <button className={`burger ${isOpen}`} onClick={toggleMenu}></button>

          <div className={`background ${isOpen}`}></div>
          <div className={`menu ${isOpen}`}>
            <nav>
              {links.map((link, index) => (
                <a
                  key={link}
                  className={isMenuOpen ? "appear" : ""}
                  style={{ animationDelay: `0.${index + 1}s` }}
                  onClick={() => onClick(link)}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="navigate">
          <p className="link">Home</p>
          <p className="link">Product</p>
          <p className="link">About</p>
          <p className="link">Contact</p>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="gadget">
          <img className="nav_icons" src={search} alt="" />
          <img className="nav_icons" src={cart} alt="" />
          <img className="nav_icons" src={user} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
