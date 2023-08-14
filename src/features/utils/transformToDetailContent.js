import getDetailMovie from "./getDetailMovie";
import getDetailSeries from "./getDetailSeries";

const transformToDetailContent = (data, mediaType) => {
  //transform data to direct object
  let result;
  if (mediaType === "movie") {
    result = data?.map((content) => {
      return getDetailMovie(content.id).then((res) => {
        return res;
      });
    });
  }
  if (mediaType === "tv") {
    result = data?.map((content) => {
      return getDetailSeries(content.id).then((res) => {
        return res;
      });
    });
  }
  return Promise.all(result);
};

export default transformToDetailContent;
