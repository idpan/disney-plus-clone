import getDetailMovie from "./getDetailMovie";
import getDetailSeries from "./getDetailSeries";

const transformToDetailContent = (data) => {
  //transform data to direct object
  const resultPromise = data?.map((content) => {
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
    return;
  });
  return Promise.all(resultPromise);
};

export default transformToDetailContent;
