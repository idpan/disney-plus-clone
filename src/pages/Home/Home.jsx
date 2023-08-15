import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import requests from "../../../requests";
import Header from "../../components/layout/Header/Header";
import Row from "../../components/ui/Row/Row";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import MainContainer from "../../components/layout/MainContaier/MainContainer";

function Home() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return !isLoggedIn ? (
    <Navigate to="/"></Navigate>
  ) : (
    <>
      <Header fetchUrl={requests.home.getTrendingAll}></Header>
      <MainContainer>
        <PageWrapper isCollapse={true}>
          <Row
            title="#AwayFromKerjaan"
            fetchUrl={requests.home.getPopularMovies}
            mediaType="movie"
          ></Row>
          <Row
            title="popular shows"
            fetchUrl={requests.home.getPopularShows}
            mediaType="tv"
          ></Row>
          <Row
            title="anime collections"
            fetchUrl={requests.home.getAnimeSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="exclusive from indonesia"
            fetchUrl={requests.home.getIndonesianMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="world of pixar"
            fetchUrl={requests.home.getPixarMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="romance"
            fetchUrl={requests.home.getRomanceMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="action and adventure"
            fetchUrl={requests.home.getActionAdventureMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="comedy"
            fetchUrl={requests.home.getComedyMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="korean wave"
            fetchUrl={requests.home.getKoreanSeries}
            mediaType="tv"
          ></Row>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Home;
