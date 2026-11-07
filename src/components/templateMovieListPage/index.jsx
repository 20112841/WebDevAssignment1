import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function MovieListPageTemplate({ movies, title, action, page, setPage, totalPages }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [sortOption, setSortOption] = useState("title");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => (genreId > 0 ? m.genre_ids?.includes(genreId) : true))
    .filter((m) => (m.vote_average ? m.vote_average >= Number(ratingFilter) : true));

  displayedMovies.sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "vote_average") {
      return b.vote_average - a.vote_average;
    } else if (sortOption === "release_date") {
      return new Date(b.release_date || 0) - new Date(a.release_date || 0);
    }
    return 0;
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sort") setSortOption(value);
  };

  const handlePageChange = (event, value) => {
    if (setPage) setPage(value);
  };

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      {/* Filter Sidebar */}
      <Grid item xs={12} md={3}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          ratingFilter={ratingFilter}
          sortOption={sortOption}
        />
      </Grid>

      {/* Movie Grid + Pagination */}
      <Grid item xs={12} md={9}>
        <MovieList action={action} movies={displayedMovies} />

        {totalPages && totalPages > 1 && (
          <Stack spacing={2} sx={{ marginTop: 4, alignItems: "center" }}>
            <Pagination
              count={totalPages > 500 ? 500 : totalPages}
              page={page || 1}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;