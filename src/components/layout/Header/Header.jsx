import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PageWrapper from "../PageWrapper/PageWrapper";

import { register } from "swiper/element/bundle";

import style from "./header.module.css";
import "./style-swiper.css";
import { push } from "firebase/database";
import { async } from "@firebase/util";
import { seriesDetail, movieDetail } from "../../../detailConstructor";
const BASE_IMG_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
register(); // TO activate swiperJS
const en = "en";

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const result = `${hours} hours ${minutes ? minutes + " minutes" : ""}`;
  return result;
}

function Header({ fetchUrl }) {
  const [featMovie, setFeatMovie] = useState({});
  const [dataContent, setDataContent] = useState([]);
  const swiperElRef = useRef(null);

  const fetchDataContent = async (fetchUrl) => {
    const REQUIRED_MOVIE_AMOUNT = 5;
    const respon = await axios.get(fetchUrl);
    const data = respon.data.results;
    const result = data.slice(0, REQUIRED_MOVIE_AMOUNT); // take only first five film
    return result;
  };
  const transformDataContent = async (data) => {
    //transform data to direct object
    const result = data?.map((content) => {
      if (content.media_type === "movie") {
        return movieDetail(content.id).then((res) => {
          return res;
        });
      }
      if (content.media_type === "tv") {
        return seriesDetail(content.id).then((res) => {
          return res;
        });
      }
      return;
    });

    return Promise.all(result);
  };

  useEffect(() => {
    fetchDataContent(fetchUrl).then((data) => {
      transformDataContent(data).then((data) => {
        setDataContent(data);
      });
    });
  }, []);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    const params = {
      // array with CSS urls
      injectStylesUrls: ["/src/components/layout/Header/style-swiper.css"],
    };
    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }, []);

  useEffect(() => {
    if (dataContent[0]) {
      setFeatMovie(dataContent[0]);
    }
  }, [dataContent]);

  return (
    <header className={style.header}>
      <swiper-container
        init="false"
        ref={swiperElRef}
        slides-per-view="auto"
        navigation="true"
        space-between="5"
        initial-slide="0"
        slides-per-group="2"
      >
        {dataContent?.map((content, index) => {
          return (
            <swiper-slide key={content?.id}>
              <input
                defaultChecked={index === 0}
                // checked={selectedMovieId === content.id}
                onChange={function (e) {
                  setFeatMovie(content);
                  const actived = document.querySelector(".active");
                  actived.classList.remove("active");
                  e.target.classList.add("active");
                }}
                value={content?.id}
                type="radio"
                id={content?.id + "-radio"}
                name="displayed_movie"
                className={index === 0 ? "active" : ""}
              />
              <label htmlFor={content?.id + "-radio"}>
                <img
                  src={BASE_IMG_URL + content?.backdrop_path}
                  alt={content?.title}
                />
              </label>
            </swiper-slide>
          );
        })}
      </swiper-container>
      <img
        key={featMovie?.id + "-featMovie"}
        className={style.hero_image}
        src={BASE_IMG_URL + featMovie?.backdrop_path}
        alt={featMovie?.title}
      />
      <PageWrapper>
        <div className={style.content}>
          {featMovie?.logo_path && (
            <img
              className={style.title}
              src={BASE_IMG_URL + featMovie?.logo_path}
              alt=""
            />
          )}
          <div className={style.info}>
            {featMovie.id && (
              <>
                {featMovie.release_year && (
                  <span>{featMovie?.release_year}</span>
                )}
                {featMovie.duration && <span>{featMovie?.duration}</span>}
                {featMovie.original_language && (
                  <span>{featMovie.original_language}</span>
                )}
                {featMovie.age_rating && (
                  <span className={style.age_restriction}>
                    {featMovie.age_rating}
                  </span>
                )}
              </>
            )}
          </div>
          <div className={style.info}>
            {featMovie?.genres?.map((genre) => {
              return <span>{genre}</span>;
            })}
          </div>
          <button>
            <span className={style.button_icon}></span>
            <span>Watch Now</span>
          </button>
        </div>
      </PageWrapper>
    </header>
  );
}

export default Header;
