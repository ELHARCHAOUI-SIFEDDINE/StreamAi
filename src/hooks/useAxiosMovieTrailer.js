import { useEffect } from "react";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../Redux/sliceMovie";

const useAxiosMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);

  useEffect(() => {
    dispatch(addTrailerVideo(null));
    getMoviesVideos();
  }, [movieId]);

  const getMoviesVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const data = await response.json();
      const trailer =
        data.results.find((video) => video.type === "Trailer") ||
        data.results[0];
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch trailer video:", error);
    }
  };
};

export default useAxiosMovieTrailer;
