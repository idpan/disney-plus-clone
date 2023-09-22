import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import { register } from "swiper/element/bundle";

import style from "./row.module.css";
import Card from "../Card/Card";
import useFetchData from "../../../features/hooks/useFetchData";
import transformToDetailContent from "../../../features/utils/transformToDetailContent.js";
import styleSwiperDom from "./swiper-dom.css?inline";
register();
function Row({ title, fetchUrl, mediaType }) {
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  const swiperElRef = useRef(null);
  const rawDataContent = useFetchData(fetchUrl);
  useEffect(() => {
    if (rawDataContent) {
      transformToDetailContent(rawDataContent, mediaType)
        .then((res) => {
          setMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rawDataContent]);
  useEffect(() => {
    if (movies) {
      const swiperEl = swiperElRef.current;
      const params = {
        // array with CSS urls
        injectStyles: [styleSwiperDom],
      };
      Object.assign(swiperEl, params);
      swiperEl.initialize();
    }
  }, [movies]);
  const handleDetail = (movie) => {
    console.log("wadaww");
    Navigate(0);
    Navigate(`/detail/${movie.media_type}/${movie.id}`);
  };
  return (
    movies && (
      <div className={style.row}>
        <h2 className={style.title}>{title}</h2>
        <swiper-container
          init="false"
          ref={swiperElRef}
          slides-per-view="auto"
          navigation="true"
          space-between="10"
          initial-slide="0"
          slides-per-group="5"
        >
          {movies?.map((movie, index) => {
            console.log(movie);
            if (movie?.poster_path && movie?.backdrop_path) {
              return (
                <swiper-slide key={index}>
                  <Link to={`/detail/${movie.media_type}/${movie.id}`}>
                    <Card
                      onclick={() => {
                        console.log("jsjs");
                        handleDetail(movie);
                      }}
                      title={movie?.title}
                      poster={movie?.poster_path}
                      backdrop_path={movie?.backdrop_path}
                      release_year={movie?.release_year}
                      original_language={movie?.original_language}
                      duration={movie?.duration}
                      age_rating={movie?.age_rating}
                      overview={movie?.overview}
                      video_key={movie?.trailer_youtube_key}
                    ></Card>
                  </Link>
                </swiper-slide>
              );
            }
          })}
        </swiper-container>
        <div className={style.row_container}>
          {movies?.map((movie, index) => {
            if (movie?.poster_path && movie?.backdrop_path) {
              return (
                <div className={style.row_slide} key={index}>
                  <Link to={`/detail/${movie.media_type}/${movie.id}`}>
                    <Card
                      title={movie?.title}
                      poster={movie?.poster_path}
                      backdrop_path={movie?.backdrop_path}
                      release_year={movie?.release_year}
                      original_language={movie?.original_language}
                      duration={movie?.duration}
                      age_rating={movie?.age_rating}
                      overview={movie?.overview}
                    ></Card>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
    )
  );
}

export default Row;
