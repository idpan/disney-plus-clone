import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getDetailMovie from "../../features/utils/getDetailMovie";
import getDetailSeries from "../../features/utils/getDetailSeries";
import HeaderWithoutSwiper from "../../components/layout/HeaderWithoutSwiper/HeaderWithoutSwiper";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
import Row from "../../components/ui/Row/Row";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";

function Detail() {
  const { mediaType, id } = useParams();
  const [detailData, setDetailData] = useState([]);
  const getDetailData = (id, mediaType) => {
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

  useEffect(() => {
    getDetailData(id, mediaType);
  }, [mediaType, id]);

  return (
    <>
      {console.log(detailData)}
      <HeaderWithoutSwiper
        background={detailData?.backdrop_path}
        title={detailData?.title}
        logo={detailData?.logo_path}
        release_year={detailData?.release_year}
        duration={detailData?.duration}
        language={detailData?.original_language}
        age_rating={detailData?.age_rating}
        genres={detailData?.genres}
        overview={detailData?.overview}
        video_key={detailData?.trailer_youtube_key}
      ></HeaderWithoutSwiper>

      <div style={{ height: "150px" }}></div>
    </>
  );
}

export default Detail;
