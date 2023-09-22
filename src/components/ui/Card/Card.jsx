import React from "react";
import WatchNowBtn from "../WatchNowBtn/WatchNowBtn";
import style from "./card.module.css";
const IMAGE_BASE_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const POSTER_WIDTH = "w185";
const CARD_DETAIL_WIDTH = "w300";
function Card(props) {
  function hai(e) {
    e.stopPropagation();
    console.log("first");
  }
  return (
    <div className={style.card}>
      <div className={`${style.card_thumbnail} card_thumbnail`}>
        <img
          loading="lazy"
          src={IMAGE_BASE_URL + POSTER_WIDTH + props.poster}
          alt={props.title}
        />
      </div>

      <div className={`${style.card_preview} card_preview `}>
        <div className={style.preview_thumbnail}>
          <img
            loading="lazy"
            src={IMAGE_BASE_URL + CARD_DETAIL_WIDTH + props.backdrop_path}
            alt={props.title}
          />
          <div className={style.layer}></div>
        </div>
        <div className={style.content}>
          <div className={style.card_btn_container}>
            <WatchNowBtn video_key={props.video_key} />
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
