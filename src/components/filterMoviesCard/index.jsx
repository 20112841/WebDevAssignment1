import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const formControlStyle = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e, propsFilterType) => {
    e.preventDefault();
    props.onUserInput(propsFilterType, e.target.value);
  };

  const handleGenreChange = (e) => {
    handleTextChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleTextChange(e, "rating", e.target.value);
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" /> Filter Movies
        </Typography>

        {/* Title Filter */}
        <TextField
          sx={{ ...formControlStyle }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={(e) => handleTextChange(e, "name", e.target.value)}
        />

        {/* Genre Filter */}
        <FormControl sx={{ ...formControlStyle }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* New Min Rating Filter */}
        <FormControl sx={{ ...formControlStyle }}>
          <InputLabel id="rating-label">Min Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={props.ratingFilter || "0"}
            onChange={handleRatingChange}
          >
            <MenuItem value="0">All Ratings</MenuItem>
            <MenuItem value="5">5+ Stars</MenuItem>
            <MenuItem value="7">7+ Stars</MenuItem>
            <MenuItem value="8">8+ Stars</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}