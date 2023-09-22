import { useEffect, useState } from "react";
import getDetailMovie from "./getDetailMovie";
import getDetailSeries from "./getDetailSeries";

const transformToDetailContent = (data, mediaType) => {
  if (mediaType === "all") {
    return Promise.all(
      data?.map((content) => {
        if (content.media_type === "movie") {
          return getDetailMovie(content.id).then((res) => {
            return res;
          });
        }
        if (content.media_type === "tv") {
          return getDetailSeries(content.id).then((res) => {
            return res;
          });
        }
      })
    );
  }

  if (mediaType === "movie") {
    return Promise.all(
      data?.map((content) => {
        return getDetailMovie(content.id).then((res) => {
          return res;
        });
      })
    );
  }
  if (mediaType === "tv") {
    return Promise.all(
      data?.map((content) => {
        return getDetailSeries(content.id).then((res) => {
          return res;
        });
      })
    );
  }
};
export default transformToDetailContent;
