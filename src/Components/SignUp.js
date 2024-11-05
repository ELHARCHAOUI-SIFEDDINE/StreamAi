import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formValidate } from "../utils/formVlidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebaseconfig";

const SignUp = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const toggleSignInForm = () => {
    setIsSignedIn(!isSignedIn);
    setError(null);
  };

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleButtonClick = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!isSignedIn) {
      // Sign-up form validation
      const error = formValidate(
        fullName.current.value,
        emailValue,
        passwordValue
      );
      setError(error);
      if (error) return;

      try {
        // Sign-up with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        console.log("User signed up successfully:", userCredential.user);
        navigate("/explore"); // Redirect to Explore page
      } catch (error) {
        handleFirebaseError(error);
      }
    } else {
      // Sign-in logic
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        console.log("User signed in successfully:", userCredential.user);
        navigate("/explore"); // Redirect to Explore page
      } catch (error) {
        handleFirebaseError(error);
      }
    }
  };

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email address.");
        break;
      case "auth/user-disabled":
        setError("This account has been disabled. Please contact support.");
        break;
      case "auth/user-not-found":
        setError("No account found with this email. Please sign up first.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/email-already-in-use":
        setError("An account with this email already exists.");
        break;
      case "auth/weak-password":
        setError("Password is too weak. Please use a stronger password.");
        break;
      default:
        setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/MA-fr-20241021-TRIFECTA-perspective_159f0306-74e1-4234-aff1-c6bce946fe2a_large.jpg"
          alt="Background"
          className="min-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <div className="px-8 py-5 bg-gradient-to-b from-black/50">
          <img
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="Logo"
            className="w-44"
          />
        </div>

        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-[450px] bg-black/80 p-16 rounded-lg shadow-2xl"
          >
            <h1 className="text-white text-3xl font-semibold mb-8">
              {isSignedIn ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignedIn && (
              <div className="space-y-1 mb-4">
                <input
                  ref={fullName}
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-[50px] bg-[#333] rounded text-gray-200 px-5 focus:outline-none focus:bg-[#454545] focus:ring-2 focus:ring-red-600 transition-all duration-200"
                />
              </div>
            )}

            <div className="space-y-1 mb-4">
              <input
                ref={email}
                type="email"
                placeholder="Email Address"
                className="w-full h-[50px] bg-[#333] rounded text-gray-200 px-5 focus:outline-none focus:bg-[#454545] focus:ring-2 focus:ring-red-600 transition-all duration-200"
              />
            </div>

            <div className="space-y-1 mb-4">
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full h-[50px] bg-[#333] rounded text-gray-200 px-5 focus:outline-none focus:bg-[#454545] focus:ring-2 focus:ring-red-600 transition-all duration-200"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-md p-3 mb-4">
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              className="w-full h-[50px] bg-[#e50914] text-white rounded font-semibold hover:bg-[#f6121d] transition-colors duration-200 mt-4 mb-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
              onClick={handleButtonClick}
            >
              {isSignedIn ? "Sign In" : "Sign Up"}
            </button>

            {isSignedIn && (
              <div className="flex items-center justify-between text-[#b3b3b3] text-sm mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer accent-[#e50914]"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Need help?
                </a>
              </div>
            )}

            <div className="text-[#737373] text-base">
              {isSignedIn ? "New to Netflix? " : "Already registered? "}
              <span
                className="text-white hover:underline cursor-pointer transition-colors"
                onClick={toggleSignInForm}
              >
                {isSignedIn ? "Sign up now" : "Sign in now"}
              </span>
            </div>

            <p className="text-sm text-[#8c8c8c] mt-5">
              This page is protected by Google reCAPTCHA to ensure you're not a
              robot.
              <a
                href="#"
                className="text-[#0071eb] hover:underline ml-1 transition-colors"
              >
                Learn more
              </a>
            </p>
          </form>
        </main>

        <footer className="relative bg-black/80 text-[#737373] text-sm py-8">
          <div className="max-w-[1000px] mx-auto px-8">
            <p className="mb-7">Questions? Contact us</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-6 mb-7">
              <a
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                FAQ
              </a>
              <a
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Cookie Preferences
              </a>
              <a
                href="#"
                className="hover:underline hover:text-white transition-colors"
              >
                Legal Notices
              </a>
            </div>
            <div className="relative inline-flex">
              <select className="bg-black border border-gray-600 rounded text-[#737373] py-2 px-3">
                <option>English</option>
                <option>Arabic</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[#737373]">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
