import React from "react";
import {
  LayoutDashboard,
  Building2,
  Layers,
  Users,
  Ticket,
  PlusCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ activeTab, setActiveTab, stats = {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  const adminEmail = user?.email || "admin@smartqueue.ma";
  const initials = adminEmail.split("@")[0].slice(0, 2).toUpperCase();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
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

      <div className="admin-sidebar-nav">
        <div className="admin-nav-group">
          <div className="admin-nav-label">Vue d'ensemble</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <div className="admin-nav-item-left">
              <LayoutDashboard size={17} />
              <span>Dashboard Global</span>
            </div>
          </button>
        </div>

        <div className="admin-nav-group">
          <div className="admin-nav-label">Gestion</div>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "etablissements" ? "active" : ""}`}
            onClick={() => setActiveTab("etablissements")}
          >
            <div className="admin-nav-item-left">
              <Building2 size={17} />
              <span>Établissements</span>
            </div>
            {stats.etablissementsCount !== undefined && (
              <span className="admin-counter-pill">
                {stats.etablissementsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            <div className="admin-nav-item-left">
              <Layers size={17} />
              <span>Services</span>
            </div>
            {stats.servicesCount !== undefined && (
              <span className="admin-counter-pill">{stats.servicesCount}</span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "utilisateurs" ? "active" : ""}`}
            onClick={() => setActiveTab("utilisateurs")}
          >
            <div className="admin-nav-item-left">
              <Users size={17} />
              <span>Utilisateurs</span>
            </div>
            {stats.utilisateursCount !== undefined && (
              <span className="admin-counter-pill">
                {stats.utilisateursCount}
              </span>
            )}
          </button>
        </div>

        <div className="admin-nav-group">
          <div className="admin-nav-label">Suivi & Contrôle</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "tickets" ? "active" : ""}`}
            onClick={() => setActiveTab("tickets")}
          >
            <div className="admin-nav-item-left">
              <Ticket size={17} />
              <span>Tous les Tickets</span>
            </div>
            {stats.ticketsCount !== undefined && (
              <span className="admin-counter-pill">{stats.ticketsCount}</span>
            )}
          </button>
        </div>

        <div className="admin-nav-group">
          <div className="admin-nav-label">Actions Rapides</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "creer-etablissement" ? "active" : ""}`}
            onClick={() => setActiveTab("creer-etablissement")}
          >
            <div className="admin-nav-item-left">
              <PlusCircle size={17} />
              <span>Créer Compte Établissement</span>
            </div>
          </button>
        </div>
      </div>

      <div className="admin-sidebar-footer">
        <div className="admin-profile-box">
          <div className="admin-avatar">{initials}</div>
          <div className="admin-profile-meta">
            <strong>{adminEmail}</strong>
            <span>Administrateur</span>
          </div>
        </div>

        <button
          type="button"
          className="admin-logout-btn"
          onClick={handleLogout}
          title="Se déconnecter"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
