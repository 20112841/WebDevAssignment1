import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieRecommendations } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  const { data: recommendations } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: getMovieRecommendations,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Typography variant="body1" gutterBottom>{movie.overview}</Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recommended Movies
      </Typography>
      
      <Grid container spacing={2}>
        {recommendations?.results?.slice(0, 4).map((recMovie) => (
          <Grid item xs={6} sm={3} key={recMovie.id}>
            <Card>
              <Link to={`/movies/${recMovie.id}`}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`https://image.tmdb.org/t/p/w500/${recMovie.poster_path}`}
                  alt={recMovie.title}
                />
              </Link>
            </Card>
            <Typography variant="subtitle2" noWrap sx={{ mt: 1 }}>
              {recMovie.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MovieDetailsPage;