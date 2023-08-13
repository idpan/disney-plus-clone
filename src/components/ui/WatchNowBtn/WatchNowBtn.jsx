import React from "react";
import style from "./watchNowBtn.module.css";
function WatchNowBtn() {
  return (
    <button className={style.watch_btn}>
      <span className={style.button_icon}></span>
      <span>Watch Now</span>
    </button>
  );
}

export default WatchNowBtn;
