import React, { useState } from "react";
import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/by-logo-white.svg";
import { useSelector } from "react-redux";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const links = [
  { link: "/", name: "Home" },
  { link: "/products", name: "Products" },
  { link: "/about", name: "about" },
  { link: "/contact", name: "Contact" },
  { link: "/orders", name: "Orders" },
];

const Header = () => {
  const iconSize = window.innerWidth < 600 ? "small" : "large";
  const { cartItems } = useSelector((state) => state.cart);
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
          <Link to={"/about"} >
            <p className="link">About</p>
          </Link>
          <Link to={"/contact"} >
            <p className="link">Contact</p>
          </Link>
        </div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="gadget">
          <Link to={"/search"}>
            <SearchIcon fontSize={iconSize} />
          </Link>
          <Link to={"/cart"}>
            <ShoppingCartRoundedIcon fontSize={iconSize} style={{color : cartItems.length == 0 ? "black" : "lightblue"}} />
            <span>{cartItems.length}</span>
          </Link>
          <Link to={"/login"}>
            <AccountCircleIcon fontSize={iconSize} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
