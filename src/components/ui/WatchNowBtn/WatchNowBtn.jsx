import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import style from "./watchNowBtn.module.css";

function WatchNowBtn({ video_key }) {
  const navigate = useNavigate();
  return (
    <Link to={`/watch/${video_key}`} className={style.watch_btn}>
      <span className={style.button_icon}></span>
      <span>Watch Now</span>
    </Link>
  );
}

export default WatchNowBtn;
