import React, { useEffect, useState } from "react";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import style from "./search.module.css";
import requests from "../../../requests";
import { Link } from "react-router-dom";
function Search() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getSearchResult = async () => {
      const res = await fetch(requests.searchMovieAndSeries(input));
      const data = await res.json();
      const result = data.results;
      setMovies(result);
      console.log(result);
    };
    getSearchResult();
  }, [input]);
  return (
    <>
      <MainContainer>
        <PageWrapper>
          <form action="" className={style.search}>
            <div className={style.search_input}>
              <img
                className={style.search_icon}
                src="/src/assets/images/search-icon.svg"
                alt="serch-icon"
              />
              <input
                onChange={(e) => {
                  setInput(e.target.value);
                  console.log(input);
                }}
                value={input}
                placeholder="Movies, shows and more"
                type="text"
              />
            </div>
            <div className={style.search_reset}>
              <button
                type="reset"
                onClick={() => {
                  setInput("");
                }}
              >
                <img src="/src/assets/images/play-icon-white.png" alt="reset" />
              </button>
            </div>
          </form>

          <main className={style.result}>
            {input && <h2 className={style.result_lable}>top result</h2>}
            <div className={style.result_container}>
              {movies.map((movie) => {
                if (!movie.backdrop_path || !movie.poster_path) return;
                const moviePoster =
                  import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path;
                const movieTitle = movie.title;
                const movieId = movie.id;
                return (
                  <Link to={`/detail?id=${movieId}`}>
                    <div className={style.result_image} key={movieId}>
                      {/* <h1>{movieTitle} || </h1> */}
                      <img src={moviePoster} alt={movieTitle} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </main>
        </PageWrapper>
      </MainContainer>
    </>
  );
}

export default Search;
