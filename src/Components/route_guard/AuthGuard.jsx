import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default AuthGuard;
