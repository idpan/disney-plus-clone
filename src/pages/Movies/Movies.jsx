import requests from "../../../requests";
import React from "react";
import Header from "../../components/layout/Header/Header";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Row from "../../components/ui/Row/Row";
function Movies() {
  return (
    <>
      <Header
        fetchUrl={requests.movies.getTrendingMovie}
        mediaType="movie"
      ></Header>
      <MainContainer>
        <PageWrapper isCollapse={true}>
          <Row
            title="popular movies"
            fetchUrl={requests.movies.getPopularMovies}
            mediaType="movie"
          ></Row>
          <Row
            title="latest movies"
            fetchUrl={requests.movies.getLatestMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="original movies"
            fetchUrl={requests.movies.getOriginalMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="asian movie"
            fetchUrl={requests.movies.getAsianMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="romance"
            fetchUrl={requests.movies.getRomanceMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="action and adventure"
            fetchUrl={requests.movies.getActionAdventureMovie}
            mediaType="movie"
          ></Row>
          <Row
            title="documentaries"
            fetchUrl={requests.movies.getDocumentarySeries}
            mediaType="movie"
          ></Row>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Movies;
