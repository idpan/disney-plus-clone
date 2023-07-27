import React from "react";
import style from "./mainContainer.module.css";
function MainContainer(props) {
  return <div className={style.container}>{props.children}</div>;
}

export default MainContainer;
