import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import img from "../images/film-poster-placeholder.png";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: person, error: personError, isLoading: loadingPerson, isError: isPersonError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: getPerson,
  });

  const { data: credits, error: creditsError, isLoading: loadingCredits, isError: isCreditsError } = useQuery({
    queryKey: ["person-credits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (loadingPerson || loadingCredits) return <Spinner />;
  if (isPersonError) return <h1>{personError.message}</h1>;
  if (isCreditsError) return <h1>{creditsError.message}</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="450"
              image={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                  : img
              }
              alt={person.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h3" gutterBottom>
              {person.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Born: {person.birthday || "N/A"} {person.place_of_birth ? `in ${person.place_of_birth}` : ""}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Biography
            </Typography>
            <Typography variant="body1" paragraph style={{ maxHeight: "200px", overflowY: "auto" }}>
              {person.biography || "No biography available."}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Known For (Filmography)
      </Typography>

      <Grid container spacing={2}>
        {credits?.cast?.slice(0, 8).map((movie) => (
          <Grid item xs={6} sm={3} key={movie.id}>
            <Card sx={{ height: "100%" }}>
              <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : img
                  }
                  alt={movie.title}
                />
                <CardContent style={{ padding: "10px" }}>
                  <Typography variant="subtitle2" noWrap color="text.primary">
                    {movie.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    Character: {movie.character || "N/A"}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActorDetailsPage;