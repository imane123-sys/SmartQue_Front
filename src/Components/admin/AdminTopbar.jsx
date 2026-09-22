import React from "react";
import { RotateCcw, Shield } from "lucide-react";

export default function AdminTopbar({ activeTab, onRefresh, isRefreshing = false }) {
  const getTabDetails = () => {
    switch (activeTab) {
      case "etablissements":
        return {
          title: "Gestion des Établissements",
          subtitle: "Consultez, ajoutez, modifiez ou supprimez les établissements partenaires.",
        };
      case "services":
        return {
          title: "Gestion des Services",
          subtitle: "Gérez l'ensemble des prestations et durées moyennes par établissement.",
        };
      case "utilisateurs":
        return {
          title: "Gestion des Utilisateurs",
          subtitle: "Supervisez les comptes clients, établissements et administrateurs.",
        };
      case "tickets":
        return {
          title: "Consulter l'Ensemble des Tickets",
          subtitle: "Suivi global de l'état des tickets et files d'attente en temps réel.",
        };
      case "creer-etablissement":
        return {
          title: "Création de Compte Établissement",
          subtitle: "Enregistrez un nouveau compte établissement avec ses coordonnées complètes.",
        };
      case "dashboard":
      default:
        return {
          title: "Tableau de Bord Global",
          subtitle: "Vue d'ensemble des statistiques et métriques clés de SmartQueue.",
        };
    }
  };

  const { title, subtitle } = getTabDetails();

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="admin-topbar-right">
        <button
          type="button"
          className="admin-refresh-btn"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Actualiser les données"
        >
          <RotateCcw size={14} className={isRefreshing ? "spin" : ""} />
          <span>{isRefreshing ? "Actualisation..." : "Actualiser"}</span>
        </button>

        <div className="admin-role-badge">
          <span className="admin-pulse-dot"></span>
          <Shield size={14} />
          <span>Espace Administrateur</span>
        </div>
      </div>
    </header>
  );
}
