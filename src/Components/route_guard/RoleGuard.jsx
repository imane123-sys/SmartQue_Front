import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
function RoleGuard({ role }) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default RoleGuard;
