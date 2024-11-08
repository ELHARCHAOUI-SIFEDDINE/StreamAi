import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMG_POSTER_CDN } from "../utils/constants";
import useAxiosMovieTrailer from "../hooks/useAxiosMovieTrailer";
import ExploreHeader from "./ExploreHeader";

const MovieDetails = () => {
  const { id } = useParams();
  const movies = useSelector((store) => store.movies);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const allMovies = [
    ...(movies.nowPlayingMovies || []),
    ...(movies.popularMovies || []),
    ...(movies.topratedmovies || []),
    ...(movies.upcomingmovies || []),
  ];

  const movie = allMovies.find((m) => m.id.toString() === id);
  useAxiosMovieTrailer(id);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!movie) {
    return (
      <div className="h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500 text-white px-6 py-4 rounded-lg max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-semibold text-lg">Error</h3>
          </div>
          <p>Unable to load movie details. Please try again later.</p>
        </div>
      </div>
    );
  }

  const backgroundStyle = {
    backgroundImage: `url(${IMG_POSTER_CDN}${movie.backdrop_path})`,
  };

  const truncatedOverview = movie.overview?.slice(0, 200);
  const hasLongOverview = movie.overview?.length > 200;

  return (
    <div className="pt-16 min-h-screen bg-black text-white">
      <ExploreHeader />

      <div className="relative h-[90vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
          style={backgroundStyle}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center md:items-start gap-8 pt-24">
            {/* Poster */}
            <div className="flex-shrink-0 group">
              <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
                <img
                  src={`${IMG_POSTER_CDN}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-64 md:w-72 object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow max-w-3xl text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-up">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>2h 15m</span>
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <span>{movie.vote_count?.toLocaleString()}</span>
                </span>
              </div>

              <div className="mb-8">
                <p className="text-lg leading-relaxed text-white/90">
                  {showFullOverview ? movie.overview : truncatedOverview}
                  {hasLongOverview && (
                    <button
                      onClick={() => setShowFullOverview(!showFullOverview)}
                      className="ml-2 text-red-600 hover:text-red-400 transition"
                    >
                      {showFullOverview ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                {movie.genre_ids?.map((genreId) => (
                  <span
                    key={genreId}
                    className="bg-white/10 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition cursor-pointer"
                  >
                    {genreId}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {trailerVideo && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Play Trailer
                  </button>
                )}
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-8 py-3 rounded-lg font-bold transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerVideo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white bg-black/50 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
