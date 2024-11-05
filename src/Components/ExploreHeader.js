import React, { useState } from "react";
import { userpic, logo } from "../utils/constants";
import { BellIcon, SearchIcon, ChevronDown, LogOut } from "lucide-react";
import { auth } from "../utils/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const ExploreHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        navigate("/error");
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black to-transparent z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img className="w-28 md:w-36" src={logo} alt="Logo" />
          <nav>
            <ul className="hidden md:flex space-x-4 text-white">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Movies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  New & Popular
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  My List
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SearchIcon className="text-white w-6 h-6 cursor-pointer" />
          <BellIcon className="text-white w-6 h-6 cursor-pointer" />
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={toggleMenu}
            >
              <img
                className="w-8 h-8 rounded"
                src={userpic}
                alt="User Avatar"
              />
              <ChevronDown className="text-white w-4 h-4" />
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 rounded-md shadow-lg py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
                >
                  <LogOut className="mr-2 w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExploreHeader;
