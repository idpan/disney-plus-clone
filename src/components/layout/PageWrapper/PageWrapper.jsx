import React from "react";
import style from "./pageWrapper.module.css";
function PageWrapper({ children, isCollapse }) {
  return (
    <div className={isCollapse ? style.container_collapse : style.container}>
      {children}
    </div>
  );
}

export default PageWrapper;
