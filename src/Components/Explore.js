import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseconfig";
import ExploreHeader from "./ExploreHeader";
import useAxiosPlayingMovies from "../hooks/useAxiosPlayingMovies";
import HeroSection from "./HeroSection";
import ListOfMoviesSection from "./ListMoviesSection";
import usePopularMovies from "../hooks/useAxiosePopularMovies";
import useTopRatedMovies from "../hooks/useAxiosTopRatedMovies";
import useUpcomingMovies from "../hooks/useAxiosUpcomingMovies";
const Explore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useAxiosPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="bg-black min-h-screen">
      <ExploreHeader />
      <main className="relative">
        <HeroSection />
        <ListOfMoviesSection />
      </main>
    </div>
  );
};

export default Explore;
