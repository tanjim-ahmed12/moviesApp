import React, { ChangeEvent } from "react";  // useState/useEffect redundant 
import { FilterOption, GenreData } from "../../types/interfaces"; //include GenreData interface 
// import React, { useState, useEffect, ChangeEvent } from "react";//update existing import
// import { FilterOption } from "../../types/interfaces"
import { SelectChangeEvent } from "@mui/material";
// import React from "react";
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
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
 
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};


interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string)  => void; // Add this line
  titleFilter: string;
  genreFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput }) => {
  // const [genres, setGenres] = useState([{ id: '0', name: "All" }])
  // const [production_countries, setCountry] = useState([{ iso_3166_1: '0', name: "All" }])

  // useEffect(() => {
  //   getGenres().then((allGenres) => {
  //     setGenres([genres[0], ...allGenres]);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  // const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
  //   e.preventDefault()
  //   onUserInput(type, value)
  // };

  // const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   handleChange(e, "title", e.target.value)
  // }

  // const handleGenreChange = (e: SelectChangeEvent) => {
  //   handleChange(e, "genre", e.target.value)
  // };
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
      onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  };

  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the movies.
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

            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/* <FormControl sx={styles.formControl}>
          <InputLabel id="productionCountry-label">Production Contries</InputLabel>
          <Select
            labelId="productionCountry-label"
            id="ProductionCountry-select"
          >
            {production_countries.map((production_countries) => {
              return (
                <MenuItem key={production_countries.iso_3166_1} value={production_countries.iso_3166_1}>
                  {production_countries.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </CardContent>
      </Card>
      </>
  );
}

export default FilterMoviesCard;
