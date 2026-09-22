import React from "react";
import {
  Building2,
  Layers,
  Users,
  Ticket,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export default function GlobalDashboard({
  etablissements = [],
  services = [],
  clients = [],
  tickets = [],
  setActiveTab,
}) {
  const countEnAttente = tickets.filter(
    (t) => String(t.statut).toUpperCase() === "EN_ATTENTE"
  ).length;
  const countEnCours = tickets.filter(
    (t) => String(t.statut).toUpperCase() === "EN_COURS"
  ).length;
  const countTermine = tickets.filter(
    (t) => String(t.statut).toUpperCase() === "TERMINE"
  ).length;
  const countAbsent = tickets.filter((t) => {
    const s = String(t.statut).toUpperCase();
    return s === "ABSENT" || s === "ANNULE";
  }).length;

  const totalTickets = tickets.length || (countEnAttente + countEnCours + countTermine + countAbsent);

  const recentEtablissements = etablissements.slice(0, 5);

  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="admin-dashboard-view">
      <div className="admin-stats-grid">
        <div
          className="admin-stat-card"
          onClick={() => setActiveTab("etablissements")}
          role="button"
          tabIndex={0}
        >
          <div className="admin-stat-header">
            <span className="admin-stat-title">Établissements</span>
            <div className="admin-stat-icon blue">
              <Building2 size={20} />
            </div>
          </div>
          <div className="admin-stat-value">{etablissements.length}</div>
          <div className="admin-stat-desc">Partenaires et cliniques actifs</div>
        </div>

        <div
          className="admin-stat-card"
          onClick={() => setActiveTab("services")}
          role="button"
          tabIndex={0}
        >
          <div className="admin-stat-header">
            <span className="admin-stat-title">Services</span>
            <div className="admin-stat-icon green">
              <Layers size={20} />
            </div>
          </div>
          <div className="admin-stat-value">{services.length}</div>
          <div className="admin-stat-desc">Prestations configurées</div>
        </div>

        <div
          className="admin-stat-card"
          onClick={() => setActiveTab("utilisateurs")}
          role="button"
          tabIndex={0}
        >
          <div className="admin-stat-header">
            <span className="admin-stat-title">Utilisateurs</span>
            <div className="admin-stat-icon purple">
              <Users size={20} />
            </div>
          </div>
          <div className="admin-stat-value">{clients.length}</div>
          <div className="admin-stat-desc">Clients, agents & admins</div>
        </div>

        <div
          className="admin-stat-card"
          onClick={() => setActiveTab("tickets")}
          role="button"
          tabIndex={0}
        >
          <div className="admin-stat-header">
            <span className="admin-stat-title">Total Tickets</span>
            <div className="admin-stat-icon amber">
              <Ticket size={20} />
            </div>
          </div>
          <div className="admin-stat-value">{totalTickets}</div>
          <div className="admin-stat-desc">Tickets suivis dans le système</div>
        </div>
      </div>

      <div className="admin-card-section">
        <div className="admin-card-header">
          <h3>Répartition des Statuts de Tickets</h3>
          <button
            type="button"
            className="admin-secondary-btn"
            style={{ height: "32px", fontSize: "12px" }}
            onClick={() => setActiveTab("tickets")}
          >
            <span>Consulter tous les tickets</span>
            <ArrowRight size={14} style={{ marginLeft: "4px" }} />
          </button>
        </div>

        <div className="admin-status-bars-grid">
          <div className="admin-status-bar-box waiting">
            <div className="admin-status-bar-header">
              <span>
                <Clock size={14} style={{ display: "inline", marginRight: "6px" }} />
                En attente
              </span>
              <strong>{countEnAttente}</strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--admin-muted-text)" }}>
              {totalTickets > 0
                ? `${Math.round((countEnAttente / totalTickets) * 100)}% du total`
                : "0%"}
            </div>
          </div>

          <div className="admin-status-bar-box current">
            <div className="admin-status-bar-header">
              <span>
                <UserCheck size={14} style={{ display: "inline", marginRight: "6px" }} />
                En cours
              </span>
              <strong>{countEnCours}</strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--admin-muted-text)" }}>
              {totalTickets > 0
                ? `${Math.round((countEnCours / totalTickets) * 100)}% du total`
                : "0%"}
            </div>
          </div>

          <div className="admin-status-bar-box done">
            <div className="admin-status-bar-header">
              <span>
                <CheckCircle2 size={14} style={{ display: "inline", marginRight: "6px" }} />
                Terminés
              </span>
              <strong>{countTermine}</strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--admin-muted-text)" }}>
              {totalTickets > 0
                ? `${Math.round((countTermine / totalTickets) * 100)}% du total`
                : "0%"}
            </div>
          </div>

          <div className="admin-status-bar-box absent">
            <div className="admin-status-bar-header">
              <span>
                <AlertCircle size={14} style={{ display: "inline", marginRight: "6px" }} />
                Absents / Annulés
              </span>
              <strong>{countAbsent}</strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--admin-muted-text)" }}>
              {totalTickets > 0
                ? `${Math.round((countAbsent / totalTickets) * 100)}% du total`
                : "0%"}
            </div>
          </div>
        </div>
      </div>

      <div className="admin-quick-actions-grid">
        <button
          type="button"
          className="admin-quick-action-btn"
          onClick={() => setActiveTab("creer-etablissement")}
        >
          <div className="admin-quick-action-icon">
            <PlusCircle size={20} />
          </div>
          <div className="admin-quick-action-text">
            <strong>Créer Établissement</strong>
            <span>Inscrire un nouveau compte</span>
          </div>
        </button>

        <button
          type="button"
          className="admin-quick-action-btn"
          onClick={() => setActiveTab("services")}
        >
          <div className="admin-quick-action-icon">
            <Layers size={20} />
          </div>
          <div className="admin-quick-action-text">
            <strong>Gérer les Services</strong>
            <span>Ajouter ou ajuster les durées</span>
          </div>
        </button>

        <button
          type="button"
          className="admin-quick-action-btn"
          onClick={() => setActiveTab("utilisateurs")}
        >
          <div className="admin-quick-action-icon">
            <Users size={20} />
          </div>
          <div className="admin-quick-action-text">
            <strong>Gérer Utilisateurs</strong>
            <span>Clients, agents et administrateurs</span>
          </div>
        </button>

        <button
          type="button"
          className="admin-quick-action-btn"
          onClick={() => setActiveTab("tickets")}
        >
          <div className="admin-quick-action-icon">
            <Ticket size={20} />
          </div>
          <div className="admin-quick-action-text">
            <strong>Suivre les Files</strong>
            <span>Consulter les tickets en direct</span>
          </div>
        </button>
      </div>

      <div className="admin-split-grid">
        <div className="admin-table-card">
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--admin-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4 style={{ fontSize: "14px", fontWeight: 700 }}>Derniers Établissements</h4>
            <button
              type="button"
              className="admin-secondary-btn"
              style={{ height: "28px", fontSize: "11px", padding: "0 10px" }}
              onClick={() => setActiveTab("etablissements")}
            >
              Gérer
            </button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {recentEtablissements.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="admin-table-empty">
                      Aucun établissement trouvé.
                    </td>
                  </tr>
                ) : (
                  recentEtablissements.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <strong>{e.nom}</strong>
                        <div style={{ fontSize: "11px", color: "var(--admin-muted-text)" }}>
                          {e.adresse || "—"}
                        </div>
                      </td>
                      <td>
                        <span className="admin-badge role-etablissement">
                          {e.type || "Établissement"}
                        </span>
                      </td>
                      <td>{e.telephone || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-table-card">
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--admin-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4 style={{ fontSize: "14px", fontWeight: 700 }}>Derniers Tickets Émis</h4>
            <button
              type="button"
              className="admin-secondary-btn"
              style={{ height: "28px", fontSize: "11px", padding: "0 10px" }}
              onClick={() => setActiveTab("tickets")}
            >
              Tous
            </button>
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Service</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="admin-table-empty">
                      Aucun ticket récent.
                    </td>
                  </tr>
                ) : (
                  recentTickets.map((t) => {
                    const s = String(t.statut).toUpperCase();
                    let badgeClass = "status-waiting";
                    let label = t.statut;
                    if (s === "EN_COURS") {
                      badgeClass = "status-current";
                      label = "En cours";
                    } else if (s === "TERMINE") {
                      badgeClass = "status-done";
                      label = "Terminé";
                    } else if (s === "ABSENT" || s === "ANNULE") {
                      badgeClass = "status-absent";
                      label = "Annulé / Absent";
                    } else {
                      label = "En attente";
                    }

                    return (
                      <tr key={t.id}>
                        <td>
                          <span className="admin-ticket-mono">#{t.numero}</span>
                        </td>
                        <td>
                          <strong>{t.nomService || t.serviceNom || "Service"}</strong>
                          <div style={{ fontSize: "11px", color: "var(--admin-muted-text)" }}>
                            {t.nomEtablissement || t.etablissementNom || "—"}
                          </div>
                        </td>
                        <td>
                          <span className={`admin-badge ${badgeClass}`}>{label}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
