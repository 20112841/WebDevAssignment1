import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingPeople } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router";
import img from "../images/film-poster-placeholder.png";

const TrendingPeoplePage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["trending-people"],
    queryFn: getTrendingPeople,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const people = data.results;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trending Actors & People
      </Typography>

      <Grid container spacing={3}>
        {people?.map((person) => (
          <Grid item xs={6} sm={3} md={2} key={person.id}>
            <Card sx={{ height: "100%" }}>
              <Link to={`/actors/${person.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                      : img
                  }
                  alt={person.name}
                />
                <CardContent style={{ padding: "10px", textAlign: "center" }}>
                  <Typography variant="subtitle2" noWrap>
                    {person.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    Popularity: {person.popularity?.toFixed(0)}
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

export default TrendingPeoplePage;