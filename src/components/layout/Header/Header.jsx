import style from "./header.module.css";
import PageWrapper from "../PageWrapper/PageWrapper";
import movieData from "../../../../disneyPlusMoviesData.json";

import React, { useEffect, useState, useRef } from "react";
import { register } from "swiper/element/bundle";
import "./style-swiper.css";
register();
function Header() {
  const [movieIndex, setMovieIndex] = useState(1);

  const nextHandler = () => {
    if (movieIndex === 16) return setMovieIndex(1);
    return setMovieIndex(movieIndex + 1);
  };

  const movie = movieData.movies[movieIndex];
  const heroImage = movie.backgroundImg;
  const titleImage = movie.titleImg;
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    const params = {
           // array with CSS urls
      injectStylesUrls: ["/src/components/layout/Header/style-swiper.css"],
    };

    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }, []);
  return (
    <header className={style.header}>
      <swiper-container
        init="false"
        ref={swiperElRef}
        slides-per-view="auto"
        navigation="true"
        space-between="10"
        initial-slide="0"
        slides-per-group="4"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
      </swiper-container>

        {/* <img className={style.hero_image} src={heroImage} alt="" /> */}
      {/* <PageWrapper>
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
      </PageWrapper> */}
    </header>
  );
}

export default Header;
