import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
async function movieDetail(movieId) {
  const getMovieDuration = (movie) => {
    const totalMinutes = movie?.runtime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const result = `${hours} hours ${minutes ? minutes + " minutes" : ""}`;
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
    if (objResult && objResult[0]) {
      return objResult.file_path;
    }
    return undefined;
  };
  return getData(movieId).then((movie) => {
    const detail = {
      title: movie?.title,
      id: movie?.id,
      media_type: "movie",
      backdrop_path: movie?.backdrop_path,
      poster_path: movie?.poster_path,
      genres: getGenres(movie),
      release_year: movie?.release_date?.split("-")[0],
      logo_path: getEnLogo(movie),
      overview: movie?.overview,
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
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      },
    };
    return detail;
  });
}
class DetailMovie {
  constructor(movieId) {
    this.getData(movieId).then((movie) => {
      this.title = movie?.title;
      this.id = movie?.id;
      this.media_type = "movie";
      this.backdrop_path = movie?.backdrop_path;
      this.poster_path = movie?.poster_path;
      this.genres = this.getGenres(movie);
      this.release_year = movie?.release_date?.split("-")[0];
      this.logo_path = this.getEnLogo(movie);
      this.overview = movie?.overview;
      this.original_language = this.getLanguage(movie);
      this.age_rating = this.getUSMovieCertification(movie);
      this.trailer_youtube_key = this.getTrailerVideo(movie);
      this.duration = this.getMovieDuration(movie);
    });
  }
  getMovieDuration = (movie) => {
    const totalMinutes = movie?.runtime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const result = `${hours} hours ${minutes ? minutes + " minutes" : ""}`;
    return result;
  };
  getTrailerVideo = (movie) => {
    const data = movie?.videos?.results;
    const result = data?.find((e) => {
      return e.type === "Trailer";
    });

    return result?.key;
  };
  getData = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_API_KEY
      }&append_to_response=videos,images,release_dates,similar,content_ratings`
    );
    const data = res.json();
    return data;
  };

  getGenres = (movie) => {
    const data = movie?.genres;
    const result = data?.map((el) => {
      return el.name;
    });
    return result;
  };
  addtoWatchlist = () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: this.id,
        watchlist: true,
        data: this,
      }),
    };

    fetch(
      `https://api.themoviedb.org/3/account/${
        import.meta.env.VITE_ACCOUNT_ID
      }/watchlist`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  getLanguage = (movie) => {
    const language = new Intl.DisplayNames(["en"], {
      type: "language",
    }).of(movie?.original_language || "");
    return language;
  };
  getUSMovieCertification = (movie) => {
    const data = movie?.release_dates.results;
    const objResult = data?.find((e) => {
      return e.iso_3166_1 == "US";
    });
    const result = objResult?.release_dates[0].certification;
    return result;
  };
  getEnLogo = (movie) => {
    const data = movie?.images?.logos;
    const objResult = data?.find((e) => {
      return e.iso_639_1 == "en";
    });
    if (objResult && objResult[0]) {
      return objResult.file_path;
    }
    return undefined;
  };
}

async function seriesDetail(seriesId) {
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
  const addtoWatchlist = () => {
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
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
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
    if (objResult && objResult[0]) {
      return objResult.file_path;
    }
    return objResult;
  };
  const getData = async (seriesId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}&append_to_response=videos,images,release_dates,similar,content_ratings`
    );
    const data = res.json();
    return data;
  };
  return getData(seriesId).then((series) => {
    const detail = {
      title: series?.name,
      id: series?.id,
      media_type: "tv",
      backdrop_path: series?.backdrop_path,
      poster_path: series?.poster_path,
      genres: getGenres(series),
      release_year: series?.first_air_date?.split("-")[0],
      logo_path: getEnLogo(series),
      overview: series?.overview,
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

        fetch(
          "https://api.themoviedb.org/3/account/20094720/watchlist",
          options
        )
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      },
    };
    return detail;
  });
}
class DetailSeries {
  constructor(seriesId) {
    this.getData(seriesId).then((series) => {
      this.title = series?.name;
      this.id = series?.id;
      this.media_type = "tv";
      this.backdrop_path = series?.backdrop_path;
      this.poster_path = series?.poster_path;
      this.genres = this.getGenres(series);
      this.release_year = series?.first_air_date?.split("-")[0];
      this.logo_path = this.getEnLogo(series);
      this.overview = series?.overview;
      this.original_language = this.getLanguage(series);
      this.age_rating = this.getUSSeriesRating(series);
      this.trailer_youtube_key = this.getTrailerVideo(series);
      this.duration = this.getSeriesAmountSeason(series);
    });
  }
  getSeriesAmountSeason = (series) => {
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
  getTrailerVideo = (series) => {
    const data = series?.videos?.results;
    const result = data?.find((e) => {
      return e.type === "Trailer";
    });
    return result?.key;
  };

  getData = async (seriesId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}&append_to_response=videos,images,release_dates,similar,content_ratings`
    );
    const data = res.json();
    return data;
  };

  getGenres = (series) => {
    const data = series?.genres;
    const result = data?.map((el) => {
      return el.name;
    });
    return result;
  };
  addtoWatchlist = () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        media_type: "tv",
        media_id: this.id,
        watchlist: true,
        data: this,
      }),
    };

    fetch("https://api.themoviedb.org/3/account/20094720/watchlist", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  getLanguage = (series) => {
    const language = new Intl.DisplayNames(["en"], {
      type: "language",
    }).of(series?.original_language || "");
    return language;
  };
  getUSSeriesRating = (series) => {
    const data = series?.content_ratings?.results;
    const objResult = data?.find((e) => {
      return e.iso_3166_1 == "US";
    });
    const result = objResult?.trating;
    return result;
  };
  getEnLogo = (series) => {
    const data = series?.images?.logos;
    const objResult = data?.find((e) => {
      return e.iso_639_1 == "en";
    });
    if (objResult && objResult[0]) {
      return objResult.file_path;
    }
    return objResult;
  };
}
movieDetail(11).then((res) => {
  console.log(res);
});
// seriesDetail(11).then((res) => {
//   console.log(res);
// });
function SandBox() {
  const [dataContent, setDataContent] = useState(null);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    setDetail(new DetailSeries(11));
  }, []);

  // const detail = new DetailMovie(11);
  // console.log(detail);

  return (
    <div>
      <h1>{detail?.title}</h1>
      <br />
      <button
        onClick={() => {
          console.log(detail.title);
          detail.addtoWatchlist();
        }}
      >
        add to watchlist
      </button>
    </div>
  );
}

export default SandBox;
