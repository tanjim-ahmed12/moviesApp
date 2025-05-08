import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
  root: { maxWidth: 345 },
  media: { height: 300 },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMoviesCardProps {
  onFilterValuesChange: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  genreFilter,
  onFilterValuesChange,
  // sortOrder,
  // onSortOrderChange
}) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data?.genres || [];
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: 0, name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault();
    onFilterValuesChange(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" /> Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            <SortIcon fontSize="medium" /> Sort by Rating
          </Typography>
          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">Sort Order</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              // value={sortOrder}
              // onChange={(e) => onSortOrderChange(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
              <MenuItem value="asc">Low to High</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
