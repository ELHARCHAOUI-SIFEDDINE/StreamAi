import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseconfig";
import ExploreHeader from "./ExploreHeader";

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

  return (
    <div>
      <ExploreHeader />
      <div className="content">
        <h1>Welcome to the Explore Page!</h1>
      </div>
    </div>
  );
};

export default Explore;
