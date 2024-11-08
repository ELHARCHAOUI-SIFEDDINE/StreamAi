import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../Redux/sliceMovie";
import { options } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store?.movies?.upcomingmovies);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      );
      console.log(data);
      const json = await data.json();
      console.log(json);
      dispatch(addUpcomingMovies(json?.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
