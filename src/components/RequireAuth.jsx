import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../features/authSlice";

const RequireAuth = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
