import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../Redux/sliceMovie";
import { options } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store?.movies?.topratedmovies);

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      );
      console.log(data);
      const json = await data.json();
      console.log(json);
      dispatch(addTopRatedMovies(json?.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
