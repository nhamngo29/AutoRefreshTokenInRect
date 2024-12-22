import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
export default function useRouteElements() {
  function ProtectedRouted() {
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }
  function RejectedRouted() {
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
  }
  const routeElements = useRoutes([
    {
      path: "/",
      element: <ProtectedRouted />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <RejectedRouted />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return routeElements;
}
