import React, { useEffect, useState, useRef } from "react";
import PageWrapper from "../PageWrapper/PageWrapper";
import { Link } from "react-router-dom";
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
  overview,
  video_key,
}) {
  return (
    <header className={style.header}>
      <div className={style.hero_image}>
        <img src={BASE_IMAGE_URL + HERO_SIZE + background} alt={title} />
      </div>
      <PageWrapper>
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
          <div className={style.btn_header_wrapper}>
            <Link to={`/watch/${video_key}`} className={style.watch_btn}>
              <span className={style.button_icon}></span>
              <span>Watch Now</span>
            </Link>
          </div>
          <div className={style.genres}>
            {genres?.map((genre, index) => {
              return <span key={index}>{genre}</span>;
            })}
          </div>
          <p className={style.overview}>{overview}</p>
        </div>
      </PageWrapper>
    </header>
  );
}

export default HeaderWithoutSwiper;
