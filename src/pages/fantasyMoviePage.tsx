// import React from "react";
// import { useQuery } from "react-query";
// import { getMovies } from "../api/tmdb-api";
// import Spinner from "../components/spinner";
// import PageTemplate from "../components/templateMovieListPage";
// import { BaseMovieProps } from "../types/interfaces";
// import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

// const FantasyMoviesPage: React.FC = () => {
//   const { data, error, isLoading, isError } = useQuery("fantasy-movies", getMovies);

//   if (isLoading) return <Spinner />;
//   if (isError) return <h1>{(error as Error).message}</h1>;

//   const movies: BaseMovieProps[] = data.results;

//   // Fantasy genre ID is typically 14 in TMDb
//   const fantasyMovies = movies.filter(movie => movie.genre_ids.includes(14));

//   return (
//     <PageTemplate
//       title="My Fantasy Movies"
//       movies={fantasyMovies}
//     //   action={() => null}
//     action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
//     />
//   );
// };

// export default FantasyMoviesPage;

// src/pages/fantasyMoviePage.tsx
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";

const FantasyMoviesPage: React.FC = () => {
  const fantasyMovies: BaseMovieProps[] = JSON.parse(
    localStorage.getItem("fantasyMovies") || "[]"
  );

  return (
    <PageTemplate
      title="My Fantasy Movies"
      movies={fantasyMovies}
      action={() => null}
    />
  );
};

export default FantasyMoviesPage;
