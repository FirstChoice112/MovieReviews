import "./App.css";
import { useState } from "react";
import { MovieDetails } from "./UIcomponents/MovieDetails";
import { ErrorMessage } from "./components/ErrorMessage";
import { Loader } from "./components/Loader";
import { NavBar } from "./UIcomponents/NavBar";
import { NumResults } from "./components/NumResults";
import { Search } from "./UIcomponents/Search";
import { Main } from "./LayoutMain";
import { WatchedMovieList } from "./UIcomponents/WatchedMovieList";
import { WatchedSummary } from "./UIcomponents/WatchedSummary";
import { MovieList } from "./UIcomponents/MovieList";
import { Box } from "./components/Box";
import { useMovies } from "./custom Hooks/useMovies";
import { useLocalStorageState } from "./custom Hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
