import { isClient } from 'lib/utilities/is'

export const API_KEY = 'c298c2cccf3f21af1e7a841e1034f72e'
export const TMDB_POSTER_ORIGIN = (isClient && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'https://image.tmdb.org/t/p/w185' : 'https://image.tmdb.org/t/p/w342'
export const TMDB_BACKDROP_ORIGIN = (isClient && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 'https://image.tmdb.org/t/p/w780' : 'https://image.tmdb.org/t/p/w1280'
export const TMDB_SMALL_BACKDROP_ORIGIN = 'https://image.tmdb.org/t/p/w500'
export const TMDB_MOVIE_ORIGIN = 'https://api.themoviedb.org/3/movie'
export const TMDB_DISCOVER_MOVIE = 'https://api.themoviedb.org/3/discover/movie'
export const TMDB_DISCOVER_TV = 'https://api.themoviedb.org/3/discover/tv'
export const TMDB_GET_SIMILAR = 'https://api.themoviedb.org/3/'
export const TMDB_TV_ORIGIN = 'https://api.themoviedb.org/3/tv'
export const TMDB_TV_SEASSON = 'https://api.themoviedb.org/3/tv/season/'
export const TMDB_MOVIE_SEARCH_ORIGIN
  = 'https://api.themoviedb.org/3/search/movie'
export const TMDB_POPULAR_MOVIE_API = 'https://api.themoviedb.org/3/movie/popular?api_key=c298c2cccf3f21af1e7a841e1034f72e'
export const TMDB_TOPRATE_MOVIE_API = 'https://api.themoviedb.org/3/movie/top_rated?api_key=c298c2cccf3f21af1e7a841e1034f72e'
export const TMDB_TRENDING_MOVIE_API = 'https://api.themoviedb.org/3/trending/movie/day'
export const TMDB_UPCOMING_MOVIE_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=c298c2cccf3f21af1e7a841e1034f72e'
export const TMDB_NOW_PLAYING_MOVIE_API = 'https://api.themoviedb.org/3/movie/now_playing'
export const TMDB_MOVIE_GENRES_API = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c298c2cccf3f21af1e7a841e1034f72e&language=en-US'
export const TMDB_TV_GENRES_API = 'https://api.themoviedb.org/3/genre/tv/list?api_key=c298c2cccf3f21af1e7a841e1034f72e&language=en-US'
export const TMDB_MULTI_SEARCH_API = 'https://api.themoviedb.org/3/search/multi'
export const TMDB_TRENDING_TV_API = 'https://api.themoviedb.org/3/trending/tv/day'
export const TMDB_TOPRATE_TV_API = 'https://api.themoviedb.org/3/tv/top_rated'
export const TMDB_POPULAR_TV_API = 'https://api.themoviedb.org/3/tv/popular'
export const TMDB_ON_THE_AIR_TV_API = 'https://api.themoviedb.org/3/tv/on_the_air'
export const TMDB_ON_AIRING_TV_API = 'https://api.themoviedb.org/3/tv/airing_today'
export const TMDB_TV_SEASON = 'https://api.themoviedb.org/3/tv/'
export const EMBED_MOVIE_API = 'https://www.2embed.to/embed/tmdb/movie/'
export const EMBED_TV_API = 'https://www.2embed.to/embed/tmdb/tv/'
