import React from "react";
import { Link } from "react-router";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: person, isLoading: personLoading } = useQuery({
    queryKey: ['person', { id }],
    queryFn: getPerson,
  });

  const { data: credits, isLoading: creditsLoading } = useQuery({
    queryKey: ['person_credits', { id }],
    queryFn: getPersonMovieCredits,
  });

  if (personLoading || creditsLoading) return <Spinner />;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={person.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>{person.name}</Typography>
          <Typography variant="h6" gutterDate gutterBottom>Biography</Typography>
          <Typography variant="body1" paragraph>{person.biography || "No biography available."}</Typography>
          <Typography variant="body2"><strong>Born:</strong> {person.birthday || "N/A"}</Typography>
          <Typography variant="body2"><strong>Place of Birth:</strong> {person.place_of_birth || "N/A"}</Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>Known For (Filmography)</Typography>
        <Grid container spacing={2}>
          {credits?.cast?.map((movie) => (
            <Grid item xs={6} sm={4} md={2} key={movie.id}>
              <Card component={Link} to={`/movies/${movie.id}`} sx={{ textDecoration: 'none', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={movie.title}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="body2" noWrap>{movie.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ActorDetailsPage;