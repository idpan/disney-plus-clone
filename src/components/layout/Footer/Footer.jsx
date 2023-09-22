import React from "react";
import style from "./footer.module.css";
function Footer() {
  return (
    <footer className={style.footer}>
      Disney+ Hotstar Clone made by{" "}
      <a
        className={style.link}
        href="linkedin.com/in/idpan-ashari"
        target="_blank"
      >
        idpan
      </a>
    </footer>
  );
}

export default Footer;
