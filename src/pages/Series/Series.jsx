import requests from "../../../requests";
import React from "react";
import Header from "../../components/layout/Header/Header";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Row from "../../components/ui/Row/Row";
function Series() {
  return (
    <>
      <Header
        fetchUrl={requests.series.getTrendingSeries}
        mediaType="tv"
      ></Header>
      <MainContainer>
        <PageWrapper isCollapse={true}>
          <Row
            title="popular series"
            fetchUrl={requests.series.getPopularSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="oroginal series"
            fetchUrl={requests.series.getOriginalSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="indonesian series"
            fetchUrl={requests.series.getIndonesianSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="k-series"
            fetchUrl={requests.series.getKoreanSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="u.s series"
            fetchUrl={requests.series.getUSASeries}
            mediaType="tv"
          ></Row>
          <Row
            title="anime collections"
            fetchUrl={requests.series.getAnimeSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="medical and crime"
            fetchUrl={requests.series.getCrimeSeries}
            mediaType="tv"
          ></Row>
          <Row
            title="documentary series"
            fetchUrl={requests.series.getDocumentarySeries}
            mediaType="tv"
          ></Row>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Series;
