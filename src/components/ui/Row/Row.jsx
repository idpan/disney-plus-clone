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

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  transformToDetailContent(useFetchData(fetchUrl))
    .then((res) => {
      setMovies(res);
    })
    .catch((err) => console.log(err));

  return (
    <div className={style.row}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.wrapper}>
        {movies?.map((movie, index) => {
          const moviePoster = baseImgUrl + movie.poster_path;
          const movieTitle = movie.title;
          const movieId = movie.id;

          return (
            <Link key={index} to={`/detail?id=${movieId}`}>
              <Card title={movie.title}></Card>
              <div key={index} className={style.poster}>
                <img key={index} src={moviePoster} alt={movieTitle} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
