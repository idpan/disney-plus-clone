const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_TMDB_URL;
const ACCOUNT_ID = import.meta.env.VITE_BASE_ACCOUNT_ID;
const HOTSTAR_ONLY = "watch_region=ID&with_watch_providers=122";
const WITHOUT_ANIMATION = "without_genres : 16";
const requests = {
  home: {
    getWatchlistMovie: `${BASE_URL}/account/${ACCOUNT_ID}/watchlist/movies`,
    getWatchlistSeries: `${BASE_URL}/account/${ACCOUNT_ID}/watchlist/tv`,
    getTrendingAll: `${BASE_URL}/trending/all/day?api_key=${API_KEY}&append_to_response=videos,images,release_dates,similar,content_ratings`,
    getPopularMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}`,
    getPopularShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}`,
    getIndonesianMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_origin_country=ID`,
    getRomanceMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=10749`,
    getActionAdventureMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=28,12`,
    getComedyMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=35`,
    getKoreanSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_origin_country=KR`,
    getPixarMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_companes=3`,
    getAnimeSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=12&with_origin_country=JP`,
  },
  series: {
    getTrendingSeries: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
    getPopularSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}`,
    getOriginalSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}&with_networks=2739`,
    getIndonesianSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_origin_country=ID`,
    getKoreanSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_origin_country=KR`,
    getUSASeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_origin_country=US`,
    getAnimeSeries: `${BASE_URL}/discovertv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=12&with_origin_country=JP`,
    getCrimeSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=80`,
    getDocumentarySeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=99`,
  },
  movies: {
    getTrendingMovie: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    getPopularMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}`,
    getLatestMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&sort_by=primary_release_date.desc`,
    getOriginalMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_companies=2`,
    getAsianMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}&with_original_country=ja|ko`,
    getSciFiMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=878`,
    getActionAdventureMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=28,12`,
    getDocumentarySeries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_genres=99`,
  },
  originals: {
    getTrendingOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_companies=2&sort_by=vote_count.desc`,
    getDisneySeries: `${BASE_URL}/discover/tv?api_key${API_KEY}&${HOTSTAR_ONLY}&with_networks2739&sort_by=primary_release_date.desc`,
    getStarSeries: `${BASE_URL}/discover/tv?api_key${API_KEY}&with_watch_providers=122,619&with_networks2739&sort_by=primary_release_date.desc`,
    getOriginalMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&${HOTSTAR_ONLY}&with_companies=2`,
    getOriginalSeries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&${HOTSTAR_ONLY}&${WITHOUT_ANIMATION}&with_networks=2739`,
  },
};
export default requests;
