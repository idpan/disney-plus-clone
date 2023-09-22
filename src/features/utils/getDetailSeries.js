const getSeriesAmountSeason = (series) => {
  const data = series?.number_of_seasons;
  if (data) {
    if (data > 1) {
      return `${data} seasons`;
    }
    if (data === 1) {
      return `${data} season `;
    }
    return "";
  }
};
const getTrailerVideo = (series) => {
  const data = series?.videos?.results;
  const result = data?.find((e) => {
    return e.type === "Trailer";
  });
  return result?.key;
};

const getGenres = (series) => {
  const data = series?.genres;
  const result = data?.map((el) => {
    return el.name;
  });
  return result;
};

const getLanguage = (series) => {
  const language = new Intl.DisplayNames(["en"], {
    type: "language",
  }).of(series?.original_language || "");
  return language;
};
const getUSSeriesRating = (series) => {
  const data = series?.content_ratings?.results;
  const objResult = data?.find((e) => {
    return e.iso_3166_1 == "US";
  });
  const result = objResult?.trating;
  return result;
};
const getEnLogo = (series) => {
  const data = series?.images?.logos;
  const objResult = data?.find((e) => {
    return e.iso_639_1 == "en";
  });
  return objResult?.file_path;
};
const getData = async (seriesId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${
      import.meta.env.VITE_API_KEY
    }&append_to_response=videos,images,release_dates,similar,content_ratings`
  );
  const data = res.json();
  return data;
};

export default async function seriesDetail(seriesId) {
  const series = await getData(seriesId);
  const detail = {
    title: series?.name,
    id: series?.id,
    media_type: "tv",
    backdrop_path: series?.backdrop_path,
    poster_path: series?.poster_path,
    overview: series?.overview,
    similar: series?.similar,
    release_year: series?.first_air_date?.split("-")[0],
    genres: getGenres(series),
    logo_path: getEnLogo(series),
    original_language: getLanguage(series),
    age_rating: getUSSeriesRating(series),
    trailer_youtube_key: getTrailerVideo(series),
    duration: getSeriesAmountSeason(series),
    addtoWatchlist: () => {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          media_type: "tv",
          media_id: seriesId,
          watchlist: true,
          data: series,
        }),
      };

      fetch("https://api.themoviedb.org/3/account/20094720/watchlist", options)
        .then((response) => response.json())
        .then((response_1) => console.log(response_1))
        .catch((err) => console.error(err));
    },
  };
  return detail;
}
