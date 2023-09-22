import React, { useEffect, useState, useRef } from "react";
import PageWrapper from "../PageWrapper/PageWrapper";

import { register } from "swiper/element/bundle";

import style from "./header.module.css";
import styleSwiperDom from "./swiper-dom.css";
import { Link } from "react-router-dom";
import useFetchData from "../../../features/hooks/useFetchData";
import transformToDetailContent from "../../../features/utils/transformToDetailContent";
import HeaderMobile from "../HeaderMobile/HeaderMobile";
const BASE_IMG_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const HERO_WIDTH = "w1280";
const SWIPER_THUMB_WIDTH = "w300";
const LOGO_WIDTH = "w500";
register(); // To activate swiperJS

const limitData = (data, limit) => {
  return data?.slice(0, limit);
};
function Header({ fetchUrl, isDetailHeader, mediaType }) {
  const [featuredMovie, setFeaturedMovie] = useState({});
  const [dataContent, setDataContent] = useState([]);
  const swiperElRef = useRef(null);
  const detailHeaderLink = useRef(null);
  const rawDataContent = useFetchData(fetchUrl);

  useEffect(() => {
    if (rawDataContent) {
      const limitedData = limitData(rawDataContent, 5);
      transformToDetailContent(limitedData, mediaType)
        .then((res) => {
          setDataContent(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rawDataContent]);

  useEffect(() => {
    if (dataContent[0]) {
      setFeaturedMovie(dataContent[0]);
    }
  }, [dataContent]);

  useEffect(() => {
    const swiperEl = swiperElRef.current;

    const params = {
      injectStyles: [styleSwiperDom],
    };
    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }, []);

  return (
    <header
      className={style.header}
      onClick={function (e) {
        detailHeaderLink.current.click();
      }}
    >
      {/* <Link
        ref={detailHeaderLink}
        className={style.detail_hero}
        to={`/detail/${featuredMovie.media_type}/${featuredMovie.id}`}
      ></Link> */}
      <HeaderMobile contents={dataContent}></HeaderMobile>
      <div className={style.header_desktop}>
        <PageWrapper>
          <swiper-container
            class={style.swiper_container_desktop}
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
                <swiper-slide
                  class={style.swiper_slide_desktop}
                  key={content?.id}
                >
                  <input
                    defaultChecked={index === 0}
                    onChange={function (e) {
                      setFeaturedMovie(content);
                      const actived = document.querySelector(
                        `.${style.active}`
                      );
                      actived.classList.remove(style.active);
                      e.target.classList.add(style.active);
                    }}
                    value={content?.id}
                    type="radio"
                    id={content?.id + "-radio"}
                    name="displayed_movie"
                    className={index === 0 ? style.active : ""}
                  />
                  <label htmlFor={content?.id + "-radio"}>
                    <img
                      src={
                        BASE_IMG_URL +
                        SWIPER_THUMB_WIDTH +
                        content?.backdrop_path
                      }
                      alt={content?.title}
                    />
                  </label>
                </swiper-slide>
              );
            })}
          </swiper-container>
          <img
            key={featuredMovie?.id + "-featuredMovie"}
            className={style.hero_image}
            src={BASE_IMG_URL + HERO_WIDTH + featuredMovie?.backdrop_path}
            alt={featuredMovie?.title}
          />
          <div className={style.content}>
            {featuredMovie?.logo_path && (
              <img
                className={style.title}
                src={BASE_IMG_URL + LOGO_WIDTH + featuredMovie?.logo_path}
                alt=""
              />
            )}
            <div className={style.info}>
              {featuredMovie.id && (
                <>
                  {featuredMovie.release_year && (
                    <span>{featuredMovie?.release_year}</span>
                  )}
                  {featuredMovie.duration && (
                    <span>{featuredMovie?.duration}</span>
                  )}
                  {featuredMovie.original_language && (
                    <span>{featuredMovie.original_language}</span>
                  )}
                  {featuredMovie.age_rating && (
                    <span className={style.age_restriction}>
                      {featuredMovie.age_rating}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className={style.info}>
              {featuredMovie?.genres?.map((genre) => {
                return <span>{genre}</span>;
              })}
            </div>
            <div
              className={style.btn_header_wrapper}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Link
                to={`/watch/${featuredMovie?.trailer_youtube_key}`}
                className={style.watch_btn}
              >
                <span className={style.button_icon}></span>
                <span>Watch Now</span>
              </Link>
            </div>
          </div>
        </PageWrapper>
      </div>
    </header>
  );
}

export default Header;
