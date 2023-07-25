import React from "react";
import style from "../styles/mainContainer.module.css";
function MainContainer(props) {
  return <main className={style.mainContainer}>{props.children}</main>;
}

export default MainContainer;
