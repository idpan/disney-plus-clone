const getMovieDuration = (movie) => {
  const totalMinutes = movie?.runtime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const result = `${hours}h ${minutes ? minutes + "m" : ""}`;
  return result;
};
const getTrailerVideo = (movie) => {
  const data = movie?.videos?.results;
  const result = data?.find((e) => {
    return e.type === "Trailer";
  });

  return result?.key;
};
const getData = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
      import.meta.env.VITE_API_KEY
    }&append_to_response=videos,images,release_dates,similar,content_ratings`
  );
  const data = res.json();
  return data;
};

const getGenres = (movie) => {
  const data = movie?.genres;
  const result = data?.map((el) => {
    return el.name;
  });
  return result;
};

const getLanguage = (movie) => {
  const language = new Intl.DisplayNames(["en"], {
    type: "language",
  }).of(movie?.original_language || "");
  return language;
};
const getUSMovieCertification = (movie) => {
  const data = movie?.release_dates.results;
  const objResult = data?.find((e) => {
    return e.iso_3166_1 == "US";
  });
  const result = objResult?.release_dates[0].certification;
  return result;
};
const getEnLogo = (movie) => {
  const data = movie?.images?.logos;
  const objResult = data?.find((e) => {
    return e.iso_639_1 == "en";
  });
  return objResult?.file_path;
};

export default async function movieDetail(movieId) {
  const movie = await getData(movieId);
  const detail = {
    title: movie?.title,
    id: movie?.id,
    media_type: "movie",
    backdrop_path: movie?.backdrop_path,
    poster_path: movie?.poster_path,
    overview: movie?.overview,
    similar: movie?.similar,
    release_year: movie?.release_date?.split("-")[0],
    genres: getGenres(movie),
    logo_path: getEnLogo(movie),
    original_language: getLanguage(movie),
    age_rating: getUSMovieCertification(movie),
    trailer_youtube_key: getTrailerVideo(movie),
    duration: getMovieDuration(movie),
    addtoWatchlist: () => {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
          data: movie,
        }),
      };

      fetch(
        `https://api.themoviedb.org/3/account/${
          import.meta.env.VITE_ACCOUNT_ID
        }/watchlist`,
        options
      )
        .then((response) => response.json())
        .then((response_1) => console.log(response_1))
        .catch((err) => console.error(err));
    },
  };
  return detail;
}
