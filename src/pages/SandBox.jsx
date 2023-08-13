import React, { useEffect, useState } from "react";
import Row from "../components/ui/Row/Row";
import requests from "../../requests";
import { movieDetail } from "../detailConstructor";
import Card from "../components/ui/Card/Card";
import style from "./sandbox.module.css";
import axios from "axios";
const image_base = import.meta.env.VITE_BASE_IMAGE_URL;
function SandBox() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    movieDetail(447365).then((res) => {
      console.log(res);
      setMovie(res);
    });
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        poster={movie.poster_path}
        backdrop_path={movie.backdrop_path}
        title={movie.title}
        release_year={movie.release_year}
        duration={movie.duration}
        original_language={movie.original_language}
        age_rating={movie.age_rating}
        overview={movie.overview}
      ></Card>
    </div>
  );
}

export default SandBox;
