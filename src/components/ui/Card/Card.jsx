import React, { useRef } from "react";
import WatchlistBtn from "../WatchlistBtn/WatchlistBtn";
import WatchNowBtn from "../WatchNowBtn/WatchNowBtn";
import style from "./card.module.css";
import "./cardHover.css";
const image_base = import.meta.env.VITE_BASE_IMAGE_URL;
function Card(props) {
  const cardRef = useRef(null);
  const previewRef = useRef(null);
  const thumbRef = useRef(null);
  let onHover; //to store setTimeOut
  return (
    <div
      ref={cardRef}
      onMouseEnter={(e) => {
        onHover = setTimeout(() => {
          // previewRef.current.style.display = "block";
          // thumbRef.current.style.display = "none";
          cardRef.current.classList.add("onHover");
        }, 500);
      }}
      onMouseLeave={(e) => {
        clearTimeout(onHover);
        // previewRef.current.style.display = "none";
        // thumbRef.current.style.display = "block";
        cardRef.current.classList.remove("onHover");
      }}
      className={style.card}
    >
      <div ref={thumbRef} className={`${style.card_thumbnail} card_thumbnail`}>
        <img src={image_base + props.poster} alt={props.title} />
      </div>
      <div ref={previewRef} className={`${style.card_preview} card_preview `}>
        <div className={style.preview_thumbnail}>
          <img src={image_base + props.backdrop_path} alt={props.title} />
          <div className={style.layer}></div>
        </div>
        <div className={style.content}>
          <div className={style.card_btn_container}>
            <WatchNowBtn />
            <WatchlistBtn />
            {/* <button className={style.watchNow_btn}>watch Now</button>
          <button className={style.addToWatchList_btn}>+</button> */}
          </div>
          <div className={style.info}>
            <span>{props.release_year}</span>
            <span>{props.duration}</span>
            <span>{props.original_laguage}Korean</span>
            <span>{props.age_rating}</span>
          </div>
          <p className={style.overview}>{props.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
