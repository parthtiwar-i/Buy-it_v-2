import React, { useState } from "react";
import "./style.css";
import { Outlet, useNavigate, Link } from "react-router-dom";
import logo from "./assets/by-logo-white.svg";
import search from "./assets/search_icon.png";
import cart from "./assets/shopping-carts.png";
import user from "./assets/user_acc.png";
const links = [
  { link: "/", name: "Home" },
  { link: "/products", name: "Products" },
  { link: "/about", name: "about" },
  { link: "/contact", name: "Contact" },
];

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
              {links.map((links, index) => (
                <a
                  key={links.name}
                  className={isMenuOpen ? "appear" : ""}
                  style={{ animationDelay: `0.${index + 1}s` }}
                  onClick={() => onClick(links.link)}
                >
                  {links.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="navigate">
          <Link to={"/"}>
            <p className="link">Home</p>
          </Link>
          <Link to={"/products"}>
            <p className="link">Product</p>
          </Link>
          <Link>
            <p className="link">About</p>
          </Link>
          <Link>
            <p className="link">Contact</p>
          </Link>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="gadget">
          <Link to={"/search"}>
            <img className="nav_icons" src={search} alt="" />
          </Link>
          <img className="nav_icons" src={cart} alt="" />
          <Link to={"/login"}>
          <img className="nav_icons" src={user} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
