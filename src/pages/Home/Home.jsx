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
      {/* <MainContainer>
        <PageWrapper isCollapse={true}>
          <Row title="trending" fetchUrl={requests.fetchTrending}></Row>
          <Row title="top rated" fetchUrl={requests.fetchTopRated}></Row>
          <Row
            title="animation"
            fetchUrl={requests.fetchAnimationMovies}
          ></Row>
          <Row title="action" fetchUrl={requests.fetchActionMovies}></Row>
          <Row title="comedy" fetchUrl={requests.fetchComedyMovies}></Row>
          <Row title="romance" fetchUrl={requests.fetchRomanceMovies}></Row>
          <Row title="horror" fetchUrl={requests.fetchHorrorMovies}></Row>
        </PageWrapper>
      </MainContainer> */}
    </>
  );
}

export default Home;
