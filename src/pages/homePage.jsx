import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const HomePage = (props) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavoritesIcon movie={movie} />
            <AddToPlaylistIcon movie={movie} />
          </>
        );
      }}
    />
  );
};

export default HomePage;