import { useDispatch } from "react-redux";
import { addPopularMovies } from "../Redux/sliceMovie";
import { options } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store?.movies?.popularMovies);

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      console.log(data);
      const json = await data.json();
      console.log(json);
      dispatch(addPopularMovies(json?.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
