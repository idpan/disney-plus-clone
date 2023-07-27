import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./row.module.css";
const baseUrl = import.meta.env.VITE_BASE_FETCH_URL;
const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL;

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchDataMovies(fetchUrl);
  }, [fetchUrl]);

  const fetchDataMovies = async (fetchUrl) => {
    const result = await axios.get(baseUrl + fetchUrl);
    const data = result.data.results;
    setMovies(data);
    return data;
  };

  return (
    <div className={style.row}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.wrapper}>
        {movies?.map((movie) => {
          const moviePoster = baseImgUrl + movie.poster_path;
          const movieTitle = movie.title;
          const movieId = movie.id;

          return (
            <Link key={movieId} to={`/detail?id=${movieId}`}>
              <div className={style.poster}>
                <img src={moviePoster} alt={movieTitle} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
