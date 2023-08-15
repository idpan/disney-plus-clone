import React, { useRef, useState } from "react";
import WatchlistBtn from "../WatchlistBtn/WatchlistBtn";
import WatchNowBtn from "../WatchNowBtn/WatchNowBtn";
import style from "./card.module.css";
const image_base = import.meta.env.VITE_BASE_IMAGE_URL;
function Card(props) {
  return (
    <div className={style.card}>
      <div className={`${style.card_thumbnail} card_thumbnail`}>
        <img src={image_base + props.poster} alt={props.title} />
      </div>

      <div className={`${style.card_preview} card_preview `}>
        <div className={style.preview_thumbnail}>
          <img src={image_base + props.backdrop_path} alt={props.title} />
          <div className={style.layer}></div>
        </div>
        <div className={style.content}>
          <div className={style.card_btn_container}>
            <WatchNowBtn />
            <WatchlistBtn />
          </div>
          <div className={style.info}>
            {props.release_year && <span>{props.release_year}</span>}
            {props.duration && <span>{props.duration}</span>}
            {props.original_language && <span>{props.original_language}</span>}
            {props.age_rating && <span>{props.age_rating}</span>}
          </div>
          <p className={style.overview}>{props.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
