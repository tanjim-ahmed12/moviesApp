import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
// import FilterMoviesCard from "../components/filterMoviesCard";

// MUI for dropdown
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
// import FilterMoviesCard from "../components/filterMoviesCard";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as "none" | "asc" | "desc");
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];

  // Apply filtering
  const filteredMovies = filterFunction(movies);

  // Conditionally apply sorting based on rating
  const displayedMovies =
    sortOrder === "asc"
      ? [...filteredMovies].sort((a, b) => a.vote_average - b.vote_average)
      : sortOrder === "desc"
      ? [...filteredMovies].sort((a, b) => b.vote_average - a.vote_average)
      : filteredMovies;

  return (
    <>
      <FormControl fullWidth sx={{ maxWidth: 250, mb: 2 }}>
        <InputLabel id="sort-label">Sort by Rating</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortOrder}
          label="Sort by Rating"
          onChange={handleSortChange}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
          <MenuItem value="asc">Low to High</MenuItem>
        </Select>
      </FormControl>

      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
      />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        // sortOrder={sortOrder}
        // onSortOrderChange={setSortOrder}
      />
      {/* <FilterMoviesCard
        ortOrder={sortOrder}
        onSortOrderChange={setSortOrder}/> */}
    </>
  );
};

export default HomePage;
