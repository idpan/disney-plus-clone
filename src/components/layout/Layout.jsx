import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import style from "./layout.module.css";
function Layout(props) {
  return (
    <div className={style.container}>
      <Navbar></Navbar>
      <div>{props.children}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
