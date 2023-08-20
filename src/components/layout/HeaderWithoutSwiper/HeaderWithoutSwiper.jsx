import React, { useEffect, useState, useRef } from "react";
import PageWrapper from "../PageWrapper/PageWrapper";

import style from "./headerWithoutSwiper.module.css";

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const HERO_SIZE = "w1280";
const LOGO_SIZE = "w300";
function HeaderWithoutSwiper({
  background,
  title,
  logo,
  release_year,
  duration,
  language,
  age_rating,
  genres,
}) {
  return (
    <header className={style.header}>
      <PageWrapper>
        <img
          className={style.hero_image}
          src={BASE_IMAGE_URL + HERO_SIZE + background}
          alt={title}
        />
        <div className={style.content}>
          {logo && (
            <img
              className={style.title}
              src={BASE_IMAGE_URL + LOGO_SIZE + logo}
              alt={title}
            />
          )}
          <div className={style.info}>
            {release_year && <span>{release_year}</span>}
            {duration && <span>{duration}</span>}
            {language && <span>{language}</span>}
            {age_rating && (
              <span className={style.age_restriction}>{age_rating}</span>
            )}
          </div>
          <div className={style.info}>
            {genres?.map((genre, index) => {
              return <span key={index}>{genre}</span>;
            })}
          </div>
          <div className={style.btn_header_wrapper}>
            <button className={style.watch_btn}>
              <span className={style.button_icon}></span>
              <span>Watch Now</span>
            </button>
            <button className={style.addToWatchlist_btn}>
              <span></span>
            </button>
          </div>
        </div>
      </PageWrapper>
    </header>
  );
}

export default HeaderWithoutSwiper;
