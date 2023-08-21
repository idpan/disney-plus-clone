import React, { useEffect } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginDetails } from "../../features/user/userSlice";
import { Link, Navigate, redirect } from "react-router-dom";

import style from "./Login.module.css";
function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    auth.onAuthStateChanged(async () => {});
  }, [isLoggedIn]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const name = res.user.displayName;
        const email = res.user.email;
        const photo = res.user.photoURL;
        setUser(name, email, photo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setUser = (name, email, photo) => {
    dispatch(
      setUserLoginDetails({
        name: name,
        email: email,
        photo: photo,
        isLoggedIn: true,
      })
    );
  };
  const signInWithDemo = () => {
    dispatch(
      setUserLoginDetails({
        name: "try demo",
        isLoggedIn: true,
      })
    );
  };
  return isLoggedIn ? (
    <Navigate to="/home"></Navigate>
  ) : (
    <div>
      <div className={style.login__container}>
        <div className={style.login__content}>
          <img
            className={style.login__logo}
            src="/assets/images/cta-logo-one.svg"
            alt="no image"
          />

          <button onClick={signInWithDemo} className={style.login__ctaButton}>
            GET Demo
          </button>
          <button
            style={{ display: "block ", margin: "20px auto" }}
            onClick={handleAuth}
          >
            Login with Google
          </button>
          <p className={style.login__description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perferendis deserunt corrupti odit neque facere dolorem
            consequuntur. Nulla similique inventore minima.
          </p>
          <img
            className={style.login__logo}
            src="/assets/images/cta-logo-two.png"
            alt="no image"
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
