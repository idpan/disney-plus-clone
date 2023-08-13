import React from "react";
import style from "./watchlistBtn.module.css";
function WatchlistBtn() {
  return (
    <button className={style.addToWatchlist_btn}>
      <span>+</span>
    </button>
  );
}

export default WatchlistBtn;
