import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardMovie from "./CardMovie";

const ListOfMovies = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtStart = container.scrollLeft === 0;
      const isAtEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1;

      setShowLeftArrow(!isAtStart);
      setShowRightArrow(!isAtEnd);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative px-6">
      <h1 className="text-2xl ml-2 md:text-xl font-bold text-white mb-6">
        {title}
      </h1>

      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 p-4 rounded-r-xl hover:bg-gray-700 transition-colors shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 p-4 rounded-l-xl hover:bg-gray-700 transition-colors shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Movie List Container */}
      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll hide-scrollbar scroll-smooth"
        >
          <div className="flex space-x-4 px-4">
            {movies?.map((movie) => (
              <CardMovie key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfMovies;
