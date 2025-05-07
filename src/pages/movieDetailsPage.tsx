import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getMovie, getMovies } from "../api/tmdb-api";
import { BaseMovieProps, MovieDetailsProps } from "../types/interfaces";

import MovieDetails from "../components/movieDetails";
import MovieCard from "../components/movieCard";
import Spinner from "../components/spinner";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
    isError: isMovieError,
  } = useQuery<MovieDetailsProps, Error>(["movie", id], () => getMovie(id || ""));

  const {
    data: allMoviesData,
    error: allMoviesError,
    isLoading: allMoviesLoading,
    isError: isAllMoviesError,
  } = useQuery<{ results: BaseMovieProps[] }, Error>("discover", getMovies);

  if (movieLoading || allMoviesLoading) return <Spinner />;
  if (isMovieError) return <h1>{movieError?.message}</h1>;
  if (isAllMoviesError) return <h1>{allMoviesError?.message}</h1>;

  const movieGenres = movie?.genres?.map((g) => g.id) ?? [];

  const similarMovies = (allMoviesData?.results ?? [])
    .filter((m) => m.id !== movie.id)
    .map((m) => {
      const overlap = m.genre_ids?.filter((gid) => movieGenres.includes(gid)) ?? [];
      return { ...m, overlapCount: overlap.length };
    })
    .filter((m) => m.overlapCount > 0)
    .sort((a, b) => b.overlapCount - a.overlapCount)
    .slice(0, 4);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {/* Left - Movie Details */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <MovieDetails {...movie} />
        </Paper>
      </Grid>

      {/* Right - Similar Movies Sidebar */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
          🎥 Similar Movies
        </Typography>
        <Grid container spacing={2}>
          {similarMovies.map((m) => (
            <Grid item xs={12} key={m.id}>
              <MovieCard movie={m} action={() => null} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieDetailsPage;
