import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../Redux/sliceMovie";
import { options } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store?.movies?.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        options
      );
      console.log(data);
      const json = await data.json();
      console.log(json);
      dispatch(addNowPlayingMovies(json?.results));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
