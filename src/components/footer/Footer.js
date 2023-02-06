import React from "react";

import "./Footer.scss";

import { Link } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/movie.png";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="" />
            <Link to="/">Movie Times</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/movie">Movie</Link>
            <Link to="/tv">TV Series</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Premium</Link>
            <Link to="/">Privacy policy</Link>
            <Link to="/">@Movie App</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Top TMDB </Link>
            <a href="#">Creator</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
