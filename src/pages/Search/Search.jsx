import React, { useEffect, useState } from "react";
import MainContainer from "../../components/layout/MainContaier/MainContainer";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Card from "../../components/ui/Card/Card";
import style from "./search.module.css";
import requests from "../../../requests";
import axios from "axios";
import getDetailMovie from "../../features/utils/getDetailMovie";
import getDetailSeries from "../../features/utils/getDetailSeries";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_TMDB_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const transformDataContent = async (data) => {
  //transform data to direct object
  const result = data?.map((content) => {
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

  return Promise.all(result);
};
function Search() {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [popularSearch, setPopularSearch] = useState([]);
  useEffect(() => {
    getPopularSearch();
  }, []);

  useEffect(() => {
    if (input) {
      const timer = setTimeout(() => {
        getSearchResult();
      }, 500);
      return () => clearTimeout(timer);
    }
    if (!input) setSearchResult([]);
  }, [input]);

  const getSearchResult = async () => {
    const respon = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${input}&include_adult=false&language=en-US&page=1`
    );
    const data = respon.data.results;

    const result = await transformDataContent(data);
    setSearchResult(result);
    return result;
  };
  const getPopularSearch = async () => {
    const respon = await axios.get(requests.home.getTrendingAll);
    const data = respon.data.results;
    const result = await transformDataContent(data);

    setPopularSearch(result);
    return result;
  };

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
                <img src="/src/assets/images/close.svg" alt="reset" />
              </button>
            </div>
          </form>

          <main className={style.result}>
            {input && <h2 className={style.result_lable}>Top Result</h2>}
            {!input && <h2 className={style.result_lable}>Popular Search</h2>}
            <div className={style.container}>
              {!input &&
                popularSearch.map((movie) => {
                  if (!movie?.backdrop_path || !movie?.poster_path) return;
                  return (
                    <Link to={`/detail?id=${movie.id}`}>
                      <Card
                        title={movie?.title}
                        poster={movie?.poster_path}
                        backdrop_path={movie?.backdrop_path}
                        release_year={movie?.release_year}
                        original_language={movie?.original_language}
                        duration={movie?.duration}
                        age_rating={movie?.age_rating}
                        overview={movie?.overview}
                      />
                    </Link>
                  );
                })}
              {input &&
                searchResult.map((movie) => {
                  if (!movie?.backdrop_path || !movie?.poster_path) return;
                  return (
                    <Link to={`/detail?id=${movie.id}`}>
                      <Card
                        title={movie?.title}
                        poster={movie?.poster_path}
                        backdrop_path={movie?.backdrop_path}
                        release_year={movie?.release_year}
                        original_language={movie?.original_language}
                        duration={movie?.duration}
                        age_rating={movie?.age_rating}
                        overview={movie?.overview}
                      />
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
