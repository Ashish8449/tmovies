import React, { useRef, useEffect } from "react";
import "./Header.scss";
import { RiMovie2Line } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";

import logo from "../../assets/movie.png";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const header_Nav = [
    {
      display: <p className="header__desktop">Home</p>,
      btn: <AiOutlineHome className="header__mobile" />,
      path: "/",
    },
    {
      display: <p className="header__desktop">Movies</p>,
      path: "/movie",
      btn: <BiMoviePlay className="header__mobile" />,
    },
    {
      display: <p className="header__desktop">TV Series</p>,
      btn: <RiMovie2Line className="header__mobile" />,
      path: "/tv",
    },
  ];

  const { pathname } = useLocation();

  const headerRef = useRef(null);

  const active = header_Nav.findIndex((e) => e.path === pathname);
  // console.log(active);
  // console.log(headerRef.current);
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />

          <Link to="/">Movie Times</Link>
        </div>
        <ul className="header__nav">
          {header_Nav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                to={e.path}
              >
                {e.btn}
                {e.display}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
