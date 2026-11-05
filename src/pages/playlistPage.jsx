import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const PlaylistPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  const playlistQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isLoading = playlistQueries.some((q) => q.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = playlistQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Must Watch Playlist"
      movies={movies}
      action={(movie) => <RemoveFromPlaylistIcon movie={movie} />}
    />
  );
};

export default PlaylistPage;