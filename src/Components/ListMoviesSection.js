import { useSelector } from "react-redux";
import ListOfMovies from "./ListOfMovies";

const ListOfMoviesSection = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="relative z-20 mt-[-150px]">
      <div className="px-8 space-y-8">
        <ListOfMovies title="Now Playing" movies={movies.nowPlayingMovies} />
        <ListOfMovies title="Trending" movies={movies.nowPlayingMovies} />
        <ListOfMovies title="Popular" movies={movies.nowPlayingMovies} />
        <ListOfMovies
          title="Upcoming Movies"
          movies={movies.nowPlayingMovies}
        />
        <ListOfMovies title="Horror" movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};
export default ListOfMoviesSection;
