import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Home() {
  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);
  const photo = useSelector(selectUserPhoto);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return !isLoggedIn ? (
    <Navigate to="/"></Navigate>
  ) : (
    <>
      <Header></Header>
    </>
  );
}

export default Home;
