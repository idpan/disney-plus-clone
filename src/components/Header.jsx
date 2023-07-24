import React, { useState } from "react";
import style from "../assets/styles/header.module.css";
import PageWrapper from "./PageWrapper";
import movieData from "../../disneyPlusMoviesData.json";
function Header() {
  const [movieIndex, setMovieIndex] = useState(1);

  const nextHandler = () => {
    if (movieIndex === 16) return setMovieIndex(1);
    return setMovieIndex(movieIndex + 1);
  };

  const movie = movieData.movies[movieIndex];
  console.log(movie);
  const heroImage = movie.backgroundImg;
  const titleImage = movie.titleImg;
  return (
    <header className={style.header}>
      <PageWrapper>
        <img className={style.hero_image} src={heroImage} alt="" />
        <div className={style.content}>
          <img className={style.title} src={titleImage} alt="title" />
          <div className={style.info}>
            <span>2021</span>
            <span>1 Season</span>
            <span>English</span>
            <span className={style.age_restriction}>13+</span>
          </div>
          <div className={style.info}>
            <span>Superhero</span>
            <span>Drama</span>
          </div>
          <button>
            <span className={style.button_icon}></span>
            <span>Watch Now</span>
          </button>
        </div>
        <button onClick={nextHandler} className={style.slider}>
          {" "}
          Next {">"}{" "}
        </button>
      </PageWrapper>
    </header>
  );
}

export default Header;
