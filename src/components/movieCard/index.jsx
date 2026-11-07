import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip"; // New MUI Component
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);
  const isFavorite = favorites.includes(movie.id);

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 4 }}>
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" noWrap>
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 400 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body2" component="p">
              <CalendarIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            {/* New MUI Chip component displaying the rating */}
            <Chip
              icon={<StarRateIcon style={{ color: '#ffb400' }} />}
              label={movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action ? action(movie) : null}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="small" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}