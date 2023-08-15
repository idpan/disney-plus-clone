// useEffect(() => {
//   fetchDataMovies(fetchUrl);
// }, [fetchUrl]);

// const fetchDataMovies = async (fetchUrl) => {
//   const result = await axios.get(fetchUrl);
//   const data = result.data.results;
//   setMovies(data);
//   console.log(result);
//   return data;
// };
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./row.module.css";
import Card from "../Card/Card";
import useFetchData from "../../../features/hooks/useFetchData";
import transformToDetailContent from "../../../features/utils/transformToDetailContent.js";
const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL;

function Row({ title, fetchUrl, mediaType }) {
  const [movies, setMovies] = useState(null);

  const rawDataContent = useFetchData(fetchUrl);
  if (title === "disney+ originals") {
    console.log(rawDataContent);
  }
  useEffect(() => {
    transformToDetailContent(rawDataContent, mediaType)
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err));
  }, [rawDataContent]);
  return (
    <div className={style.row}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.wrapper}>
        {movies?.map((movie, index) => {
          if (movie?.poster_path && movie?.backdrop_path) {
            return (
              <Link key={index} to={`/detail?id=${movie?.id}`}>
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
