import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
  let movieCards = props.movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
      <Movie key={m.id} movie={m} action={props.action} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {movieCards}
    </Grid>
  );
};

export default MovieList;