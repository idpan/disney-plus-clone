import React from "react";

import requests from "../../../requests";

import Header from "../../components/layout/Header/Header";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Row from "../../components/ui/Row/Row";
function Originals() {
  return (
    <>
      <Header
        fetchUrl={requests.originals.getTrendingOriginals}
        mediaType="movie"
      ></Header>
      <MainContainer>
        <PageWrapper isCollapse={true}>
          <Row
            title="disney+ originals"
            fetchUrl={requests.originals.getDisneySeries}
            mediaType="tv"
          ></Row>
          <Row
            title="star originals"
            fetchUrl={requests.originals.getStarSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="original series"
            fetchUrl={requests.originals.getOriginalSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="original movies"
            fetchUrl={requests.originals.getOriginalMovie}
            mediaType="movie"
          ></Row>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Originals;
