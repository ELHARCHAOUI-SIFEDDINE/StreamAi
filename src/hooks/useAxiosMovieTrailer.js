import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo, setLoading } from "../Redux/sliceMovie";

const useAxiosMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  useEffect(() => {
    !trailerVideo && getMoviesVideos();
  }, []);

  const getMoviesVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        options
      );
      const json = await data.json();
      console.log(json);

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];
      console.log(trailer);
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.log(error);
    }
  };
};

export default useAxiosMovieTrailer;
