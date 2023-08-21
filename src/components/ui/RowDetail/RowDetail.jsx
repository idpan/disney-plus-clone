import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { register } from "swiper/element/bundle";

import style from "./row.module.css";
import Card from "../Card/Card";
import styleSwiperDom from "./swiper-dom.css";

register();
function RowDetail({ title, data }) {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    const params = {
      // array with CSS urls
      injectStyles: [styleSwiperDom],
    };
    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }, []);

  return (
    <div className={style.row + " row"}>
      <h2 className={style.title}>{title}</h2>
      <swiper-container
        init="false"
        ref={swiperElRef}
        slides-per-view="auto"
        navigation="true"
        space-between="10"
        initial-slide="0"
        slides-per-group="6"
      >
        {data?.map((movie, index) => {
          if (movie?.poster_path && movie?.backdrop_path) {
            return (
              <swiper-slide key={index}>
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
              </swiper-slide>
            );
          }
        })}
      </swiper-container>
    </div>
  );
}

export default RowDetail;
