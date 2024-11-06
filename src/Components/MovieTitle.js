import React from "react";
import { Play, Info } from "lucide-react";

const MovieTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black to-transparent">
      <h1 className="text-3xl md:text-6xl font-extrabold">{title}</h1>
      <p className="hidden md:block py-4 text-base md:text-lg w-3/4 md:w-1/3 font-light leading-snug">
        {overview}
      </p>
      <div className="flex gap-4 my-4">
        <button className="flex items-center bg-white text-black py-2 px-6 md:py-3 md:px-10 text-lg md:text-xl font-semibold rounded hover:bg-opacity-80 transition duration-200">
          <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" /> Play
        </button>
        <button className="hidden md:flex items-center bg-gray-600 bg-opacity-60 text-white py-2 px-6 md:py-3 md:px-8 text-lg md:text-xl rounded hover:bg-opacity-70 transition duration-200">
          <Info className="w-5 h-5 md:w-6 md:h-6 mr-2" /> More Info
        </button>
      </div>
    </div>
  );
};

export default MovieTitle;
