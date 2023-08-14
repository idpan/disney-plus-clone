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
            title="Anime Collections"
            fetchUrl={requests.home.getTrendingAll}
          ></Row>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Home;
