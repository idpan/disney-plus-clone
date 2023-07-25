import React from "react";
import style from "../styles/pageWrapper.module.css";
function PageWrapper(props) {
  return <div className={style.pageWrapper}>{props.children}</div>;
}

export default PageWrapper;
