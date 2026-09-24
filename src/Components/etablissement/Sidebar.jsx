import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Ticket,
  BriefcaseBusiness,
} from "lucide-react";
import { useAuth } from "../AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    localStorage.removeItem("ticket");
    localStorage.removeItem("selectedTicketId");
    navigate("/login");
  };

  const displayName = user?.email ? user.email.split("@")[0] : "Établissement";
  const avatarLetter = user?.email ? user.email.charAt(0).toUpperCase() : "E";

  const isTicketsActive = location.pathname === "/dashboard-etablissement";
  const isServicesActive = location.pathname === "/services-etablissement";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Ticket size={16} />
          </div>
          <div>
            <span className="logo-name">SmartQueue</span>
            <span className="logo-subtitle">VOTRE TEMPS A DE LA VALEUR</span>
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        <Link
          to="/dashboard-etablissement"
          className={`sidebar-nav-link ${isTicketsActive ? "active" : ""}`}
        >
          <Ticket size={18} />
          <span>Tickets</span>
        </Link>

        <Link
          to="/services-etablissement"
          className={`sidebar-nav-link ${isServicesActive ? "active" : ""}`}
        >
          <BriefcaseBusiness size={18} />
          <span>Services</span>
        </Link>
      </div>

      <div className="sidebar-user">
        <div className="user-box">
          <div className="user-avatar">{avatarLetter}</div>

          <div className="user-info">
            <span>{displayName}</span>
            <small>{user?.email || "En ligne"}</small>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            title="Se déconnecter"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
