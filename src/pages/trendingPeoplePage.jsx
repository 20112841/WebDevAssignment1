import React from "react";
import { getTrendingPeople } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router";
import Container from "@mui/material/Container";

const TrendingPeoplePage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['trending_people'],
    queryFn: getTrendingPeople,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const people = data.results;

  return (
    <Container sx={{ paddingTops: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trending Actors & Crew
      </Typography>
      <Grid container spacing={3}>
        {people.map((person) => (
          <Grid item xs={12} sm={6} md={3} key={person.id}>
            <Card component={Link} to={`/person/${person.id}`} sx={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                alt={person.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" color="text.primary">
                  {person.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Known for: {person.known_for_department}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrendingPeoplePage;