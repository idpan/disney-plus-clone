import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "./row.module.css";
import Card from "../Card/Card";
import useFetchData from "../../../features/hooks/useFetchData";
import transformToDetailContent from "../../../features/utils/transformToDetailContent.js";

function Row({ title, fetchUrl, mediaType }) {
  const [movies, setMovies] = useState(null);

  const rawDataContent = useFetchData(fetchUrl);
  useEffect(() => {
    if (rawDataContent) {
      transformToDetailContent(rawDataContent, mediaType)
        .then((res) => {
          setMovies(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rawDataContent]);

  return (
    <div className={style.row + " row"}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.row_container}>
        {movies?.map((movie, index) => {
          if (movie?.poster_path && movie?.backdrop_path) {
            return (
              <Link to={`/detail/${movie.media_type}/${movie.id}`}>
                <Card
                  title={movie?.title}
                  poster={movie?.poster_path}
                  backdrop_path={movie?.backdrop_path}
                  release_year={movie?.release_year}
                  original_language={movie?.original_language}
                  duration={movie?.duration}
                  age_rating={movie?.age_rating}
                  overview={movie?.overview}
                ></Card>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Row;
