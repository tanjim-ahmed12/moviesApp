// import React, { useContext } from "react";
// import { MoviesContext } from "../contexts/movieContext";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import MovieCard from "../components/movieCard"; // Adjust this import path to where your MovieCard is
// import { BaseMovieProps } from "../types/interfaces";

// const MustWatchPage: React.FC = () => {
//   const { mustWatch } = useContext(MoviesContext);

//   return (
//     <>
//       <Typography variant="h4" component="h2" gutterBottom>
//         🎬 Must Watch Movies
//       </Typography>
//       <Grid container spacing={3}>
//         {mustWatch.length === 0 ? (
//           <Typography variant="body1" sx={{ ml: 2 }}>
//             No movies in your Must Watch list yet.
//           </Typography>
//         ) : (
//           mustWatch.map((movie) => (
//             <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
//               <MovieCard movie={movie} action={function (m: BaseMovieProps): React.ReactNode {
//                       throw new Error("Function not implemented.");
//                   } } />
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </>
//   );
// };

// export default MustWatchPage;

import React, { useContext } from "react";
import { useQuery } from "react-query";
import { MoviesContext } from "../contexts/movieContext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MovieCard from "../components/movieCard";
import { BaseMovieProps } from "../types/interfaces";
import { getMovies } from "../api/tmdb-api"; // Update this path if needed

const MustWatchPage: React.FC = () => {
  const { mustWatch } = useContext(MoviesContext);

  const { data, isLoading, error } = useQuery(["discover"], getMovies);

  if (isLoading) return <Typography>Loading movies...</Typography>;
  if (error || !data) return <Typography>Error loading movies.</Typography>;

  // Extract actual movie list from response
  const allMovies: BaseMovieProps[] = data.results;

  // Filter movies by IDs in mustWatch list
  const mustWatchMovies = allMovies.filter((movie) => mustWatch.includes(movie));

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        🎬 Must Watch Movies
      </Typography>
      <Grid container spacing={3}>
        {mustWatchMovies.length === 0 ? (
          <Typography variant="body1" sx={{ ml: 2 }}>
            No movies in your Must Watch list yet.
          </Typography>
        ) : (
          mustWatchMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} action={() => null} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default MustWatchPage;


