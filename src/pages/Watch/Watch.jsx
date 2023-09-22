import React from "react";
import { useNavigate, useParams } from "react-router";
import style from "./watch.module.css";
function Watch() {
  const { video_key } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <button
        className={style.back_btn}
        onClick={() => {
          navigate(-1);
        }}
      ></button>

      <iframe
        src={`https://www.youtube.com/embed/${video_key}?autoplay=1&rel=0`}
        className={style.watch_frame}
      ></iframe>
    </>
  );
}

export default Watch;
