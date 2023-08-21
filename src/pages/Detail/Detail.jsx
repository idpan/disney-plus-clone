import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getDetailMovie from "../../features/utils/getDetailMovie";
import getDetailSeries from "../../features/utils/getDetailSeries";

import HeaderWithoutSwiper from "../../components/layout/HeaderWithoutSwiper/HeaderWithoutSwiper";
import RowDetail from "../../components/ui/RowDetail/RowDetail";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
function Detail() {
  const { mediaType, id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const getDetail = (id, mediaType) => {
    if (mediaType === "movie") {
      getDetailMovie(id).then((res) => {
        setDetailData(res);
      });
    }
    if (mediaType === "tv") {
      getDetailSeries(id).then((res) => {
        setDetailData(res);
      });
    }
  };
  const getSimilarContent = (data) => {
    //transform data to direct object
    let result;
    if (mediaType === "movie") {
      result = data?.map(async (content) => {
        const res = await getDetailMovie(content.id);
        return res;
      });
    }
    if (mediaType === "tv") {
      result = data?.map(async (content) => {
        const res = await getDetailSeries(content.id);
        return res;
      });
    }
    return Promise.all(result);
  };
  useEffect(() => {
    console.log(id);
    getDetail(id, mediaType);
  }, []);
  useEffect(() => {
    if (detailData) {
      getSimilarContent(detailData?.similar?.results).then((res) => {
        setSimilarContent(res);
      });
    }
  }, [detailData]);
  console.log(similarContent);

  return (
    <>
      <HeaderWithoutSwiper
        background={detailData?.backdrop_path}
        title={detailData?.title}
        logo={detailData?.logo_path}
        release_year={detailData?.release_year}
        duration={detailData?.duration}
        language={detailData?.original_language}
        age_rating={detailData?.age_rating}
        genres={detailData?.genres}
      ></HeaderWithoutSwiper>
      <MainContainer>
        <PageWrapper isCollapse={true}>
          {similarContent[0] && (
            <RowDetail title="more like this" data={similarContent}></RowDetail>
          )}
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Detail;
