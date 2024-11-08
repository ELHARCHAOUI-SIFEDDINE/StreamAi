import { useSelector } from "react-redux";
import ListOfMovies from "./ListOfMovies";

const ListOfMoviesSection = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="relative z-20 mt-[-150px]">
      <div className="px-8 space-y-8">
        <ListOfMovies title="Now Playing" movies={movies.nowPlayingMovies} />
        <ListOfMovies title="Top Rated" movies={movies.topratedmovies} />
        <ListOfMovies title="Popular" movies={movies.popularMovies} />
        <ListOfMovies title="Upcoming Movies" movies={movies.upcomingmovies} />
      </div>
    </div>
  );
};
export default ListOfMoviesSection;
