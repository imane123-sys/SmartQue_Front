import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
function RoleGuard({ allowedRoles }) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RoleGuard;
