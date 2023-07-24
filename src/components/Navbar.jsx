import React from "react";
import { Link } from "react-router-dom";
import style from "../assets/styles/navbar.module.css";
function Navbar({ userPhoto = "/src/assets/images/user.png" }) {
  return (
    <nav className={style.navbar}>
      <div className={style.collapse_agent}>
        <div className={style.wrapper}>
          <img
            className={style.logo}
            src="/src/assets/images/logo-d-plus.svg"
            alt="disney-logo"
          />
          <div className={style.menu}>
            <Link to="/profile">
              <img src={userPhoto} alt="" />
              <span>Profile</span>
            </Link>
            <Link to="/search">
              <img src="/src/assets/images/search-icon.svg" alt="" />
              <span>Search</span>
            </Link>
            <Link to="/home">
              <img src="/src/assets/images/home-icon.svg" alt="" />
              <span>Home</span>
            </Link>
            <Link to="/series">
              <img src="/src/assets/images/series-icon.svg" alt="" />
              <span>Series</span>
            </Link>
            <Link to="/movies">
              <img src="/src/assets/images/movie-icon.svg" alt="" />
              <span>Movies</span>
            </Link>
            <Link to="/originals">
              <img src="/src/assets/images/original-icon.svg" alt="" />
              <span>Originals</span>
            </Link>{" "}
          </div>
        </div>
      </div>
      <div className={style.collapse}></div>
    </nav>
  );
}

export default Navbar;
