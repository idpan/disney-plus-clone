const API_KEY = import.meta.env.VITE_API_KEY;
const requests = {
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/movie?api_key=${API_KEY}&language=en-US&with_companies=
  178464|185004|186222|198834|171251|145174|192478`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&append_to_response=video`,
};
export default requests;
