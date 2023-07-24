import React from "react";
import Navbar from "./Navbar";
import PageWrapper from "./PageWrapper";

function Layout(props) {
  return (
    <>
      <Navbar></Navbar>
      {props.children}
    </>
  );
}

export default Layout;
