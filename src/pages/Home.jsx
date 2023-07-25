import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import requests from "../../requests";
import Header from "../layouts/Header";
import Row from "../components/Row";
import PageWrapper from "../layouts/PageWrapper";
import MainContainer from "./MainContainer";

function Home() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return !isLoggedIn ? (
    <Navigate to="/"></Navigate>
  ) : (
    <>
      <Header></Header>

      <MainContainer>
        <PageWrapper>
          <Row
            title="popular series"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
          <Row
            title="popular series"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
          <Row
            title="popular series"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
          <Row
            title="popular series"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
          <Row
            title="popular series"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
          <Row
            title="popular series"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Home;
