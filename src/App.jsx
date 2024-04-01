import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./Search.svg";
import MovieCard from "./MovieCard";

const apiURL = "https://www.omdbapi.com?apikey=fb31b005";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (movieName) => {
    const response = await fetch(`${apiURL}&s=${movieName}`);
    const data = await response.json();
    setMovies(data.Search || []); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  useEffect(() => {
    searchMovies("money heist");
  }, []);

  return (
    <div className="app">
      <h1>MovieTail</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
