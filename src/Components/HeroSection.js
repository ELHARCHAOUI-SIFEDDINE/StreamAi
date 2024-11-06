import { useSelector } from "react-redux";
import MovieVideo from "./MovieVideo";
import MovieTitle from "./MovieTitle";
const HeroSection = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[2];
  const { original_title, overview, id } = mainMovie;
  return (
    <>
      {" "}
      <div className="pt-[10%] md:py-0 md:-mt-24 bg-black">
        {" "}
        <MovieTitle title={original_title} overview={overview} />{" "}
        <MovieVideo movieId={id} />{" "}
      </div>{" "}
    </>
  );
};
export default HeroSection;
