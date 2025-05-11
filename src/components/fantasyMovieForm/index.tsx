// src/pages/FantasyMovieFormPage.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Fantasy" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Comedy" },
];

const FantasyMovieFormPage: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    overview: "",
    genreIds: [] as number[],
    releaseDate: "",
    runtime: "",
    productionCompanies: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedIds = Array.from(
  //     e.target.selectedOptions,
  //     (option: any) => parseInt(option.value)
  //   );
  //   setForm({ ...form, genreIds: selectedIds });
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("fantasyMovies") || "[]");
    localStorage.setItem("fantasyMovies", JSON.stringify([...stored, form]));
    navigate("/fantasy"); // go to fantasy movies list
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Create Your Fantasy Movie</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Overview"
          name="overview"
          value={form.overview}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          select
          SelectProps={{ multiple: true }}
          label="Genres"
          name="genreIds"
          value={form.genreIds.map(String)}
          onChange={(e: any) =>
            setForm({ ...form, genreIds: e.target.value.map(Number) })
          }
          fullWidth
          margin="normal"
        >
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          value={form.releaseDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Runtime (mins)"
          name="runtime"
          value={form.runtime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Production Company(s)"
          name="productionCompanies"
          value={form.productionCompanies}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Save Movie
        </Button>
      </form>
    </Box>
  );
};

export default FantasyMovieFormPage;
