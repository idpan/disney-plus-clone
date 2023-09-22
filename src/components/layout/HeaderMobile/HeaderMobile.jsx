import React, { useRef, useEffect } from "react";
import style from "./headerMobile.module.css";
import styleSwiperDom from "./swiper-dom.css";
import { register } from "swiper/element/bundle";
import WatchNowBtn from "../../ui/WatchNowBtn/WatchNowBtn";
const BASE_IMG_URL = import.meta.env.VITE_BASE_IMAGE_URL;
const HERO_WIDTH = "w1280";
const SWIPER_THUMB_WIDTH = "w300";
const LOGO_WIDTH = "w500";

register();
function HeaderMobile({ contents }) {
  const swiperElRef = useRef(null);
  useEffect(() => {
    const swiperEl = swiperElRef.current;

    const params = {
      injectStyles: [styleSwiperDom],
    };
    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }, []);
  return (
    <swiper-container
      class={style.swiper_container_mobile}
      onClick={(e) => {
        e.stopPropagation();
      }}
      init="false"
      ref={swiperElRef}
      effect="fade"
      slides-per-view="auto"
      pagination={true}
      pagination-clickable="true"
      //   space-between="5"
      initial-slide="0"
      //   slides-per-group="2"
    >
      {contents?.map((content, index) => {
        return (
          <swiper-slide class={style.swiper_slide_mobile} key={content?.id}>
            <div
              style={{
                backgroundImage: `url(${
                  BASE_IMG_URL + HERO_WIDTH + content?.backdrop_path
                })`,
              }}
              className={style.hero}
            >
              <div className={style.layer}></div>
              <div
                className={style.logo}
                style={{
                  backgroundImage: `url(${
                    BASE_IMG_URL + LOGO_WIDTH + content?.logo_path
                  })`,
                }}
              ></div>
            </div>
            <div className={style.info}>
              {content.id && (
                <>
                  {content.release_year && <span>{content?.release_year}</span>}
                  {content.original_language && (
                    <span>{content.original_language}</span>
                  )}
                  {content?.genres?.map((genre, index) => {
                    if (index === 0 || index === 1) {
                      return <span>{genre}</span>;
                    }
                  })}
                </>
              )}
            </div>
            <div
              className={style.btn_header_wrapper}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <WatchNowBtn
                video_key={content?.trailer_youtube_key}
              ></WatchNowBtn>
            </div>
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
}

export default HeaderMobile;
