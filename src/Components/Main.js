import { createBrowserRouter } from "react-router-dom";
import { RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Explore from "./Explore";
import SignUp from "./SignUp";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/explore" replace /> : children;
};

const Main = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <SignUp />
        </RequireAuth>
      ),
    },
    {
      path: "/explore",
      element: <Explore />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
};

export default Main;
