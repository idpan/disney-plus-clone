import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import PageWrapper from "../PageWrapper/PageWrapper";

import { register } from "swiper/element/bundle";

import style from "./header.module.css";
import "./style-swiper.css";
import { push } from "firebase/database";
import { async } from "@firebase/util";
import { seriesDetail, movieDetail } from "../../../detailConstructor";
import { Link } from "react-router-dom";
const BASE_IMG_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const HERO_WIDTH = "w1280";
const SWIPER_THUMB_WIDTH = "w300";
const LOGO_WIDTH = "w500";
register(); // TO activate swiperJS
const en = "en";

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const result = `${hours} hours ${minutes ? minutes + " minutes" : ""}`;
  return result;
}

function Header({ fetchUrl, isDetailHeader, mediaType }) {
  const [featMovie, setFeatMovie] = useState({});
  const [dataContent, setDataContent] = useState([]);
  const swiperElRef = useRef(null);
  const detailHeaderLink = useRef(null);

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
      if (mediaType === "movie") {
        return movieDetail(content.id).then((res) => {
          return res;
        });
      }
      if (mediaType === "tv") {
        return seriesDetail(content.id).then((res) => {
          return res;
        });
      }
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
  const getDataContent = async (fetchUrl) => {
    const resDataContent = await fetchDataContent(fetchUrl);
    const transformedData = await transformDataContent(resDataContent);
    setDataContent(transformedData);
    console.log(transformedData);
  };
  // useEffect(() => {
  //   // fetchDataContent(fetchUrl).then((data) => {
  //   //   transformDataContent(data).then((data) => {
  //   //     setDataContent(data);
  //   //     console.log(data);
  //   //   });
  //   getDataContent(fetchUrl)
  //   });
  // } ,[]);
  useEffect(() => {
    getDataContent(fetchUrl);
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
    console.log(dataContent);
    if (dataContent[0]) {
      setFeatMovie(dataContent[0]);
      console.log(dataContent);
    }
  }, [dataContent]);

  return (
    <header
      className={
        style.header + " " + (isDetailHeader ? style.header_detail : "")
      }
      onClick={function (e) {
        if (!isDetailHeader) {
          detailHeaderLink.current.click();
        }
      }}
    >
      {!isDetailHeader && (
        <Link
          ref={detailHeaderLink}
          className={style.detail_hero}
          to={`/detail/${featMovie.media_type}/${featMovie.id}`}
        ></Link>
      )}
      <PageWrapper>
        <swiper-container
          onClick={(e) => {
            e.stopPropagation();
          }}
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
                    src={
                      BASE_IMG_URL + SWIPER_THUMB_WIDTH + content?.backdrop_path
                    }
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
          src={BASE_IMG_URL + HERO_WIDTH + featMovie?.backdrop_path}
          alt={featMovie?.title}
        />
        <div className={style.content}>
          {/* {console.log(featMovie)} */}
          {featMovie?.logo_path && (
            <img
              className={style.title}
              src={BASE_IMG_URL + LOGO_WIDTH + featMovie?.logo_path}
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
          <div
            className={style.btn_header_wrapper}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
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

export default Header;
