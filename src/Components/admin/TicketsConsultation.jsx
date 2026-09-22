import React, { useState } from "react";
import {
  Search,
  Ticket,
  Clock,
  Building2,
  Layers,
  User,
  Eye,
  X,
  QrCode,
  Calendar,
} from "lucide-react";

export default function TicketsConsultation({
  tickets = [],
  etablissements = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("ALL");
  const [filterEtablissement, setFilterEtablissement] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filteredTickets = tickets.filter((t) => {
    const s = String(t.statut || "").toUpperCase();
    const matchesStatut =
      filterStatut === "ALL" ||
      s === filterStatut ||
      (filterStatut === "ABSENT" && s === "ANNULE");

    const matchesEtab =
      filterEtablissement === "ALL" ||
      String(t.etablissementId) === String(filterEtablissement) ||
      String(t.nomEtablissement).toLowerCase() ===
        String(filterEtablissement).toLowerCase();

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      String(t.numero || "").includes(searchLower) ||
      (t.nomClient || "").toLowerCase().includes(searchLower) ||
      (t.clientNomComplet || "").toLowerCase().includes(searchLower) ||
      (t.nomService || "").toLowerCase().includes(searchLower) ||
      (t.nomEtablissement || "").toLowerCase().includes(searchLower);

    return matchesStatut && matchesEtab && matchesSearch;
  });

  const getStatusBadge = (statut) => {
    const s = String(statut || "").toUpperCase();
    if (s === "EN_COURS") {
      return <span className="admin-badge status-current">En cours</span>;
    }
    if (s === "TERMINE") {
      return <span className="admin-badge status-done">Terminé</span>;
    }
    if (s === "ABSENT" || s === "ANNULE") {
      return <span className="admin-badge status-absent">Annulé / Absent</span>;
    }
    return <span className="admin-badge status-waiting">En attente</span>;
  };

  return (
    <div className="admin-tickets-view">
      
      <div className="admin-toolbar">
        <div className="admin-toolbar-left" style={{ flexWrap: "wrap" }}>
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par n° de ticket, client, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="admin-filter-select"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="EN_ATTENTE">En attente</option>
            <option value="EN_COURS">En cours</option>
            <option value="TERMINE">Terminés</option>
            <option value="ABSENT">Absents / Annulés</option>
          </select>

          <select
            value={filterEtablissement}
            onChange={(e) => setFilterEtablissement(e.target.value)}
            className="admin-filter-select"
          >
            <option value="ALL">Tous les établissements</option>
            {etablissements.map((e) => (
              <option key={e.id} value={e.nom}>
                {e.nom}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "var(--admin-muted-text)",
            fontWeight: 500,
          }}
        >
          Total affiché : <strong>{filteredTickets.length}</strong> tickets
        </div>
      </div>

      
      <div className="admin-table-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>N° Ticket</th>
                <th>Client</th>
                <th>Service</th>
                <th>Établissement</th>
                <th>Position</th>
                <th>Temps Estimé</th>
                <th>Statut</th>
                <th>Date de création</th>
                <th style={{ textAlign: "right" }}>Détails</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="admin-table-empty">
                    Aucun ticket trouvé pour ces critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <span className="admin-ticket-mono">
                        #{ticket.numero}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <User size={13} color="var(--admin-muted-text)" />
                        <strong>
                          {ticket.nomClient ||
                            ticket.clientNomComplet ||
                            "Client"}
                        </strong>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Layers size={13} color="var(--admin-muted-text)" />
                        <span>
                          {ticket.nomService || ticket.serviceNom || "—"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Building2 size={13} color="var(--admin-primary)" />
                        <span>
                          {ticket.nomEtablissement ||
                            ticket.etablissementNom ||
                            "—"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-counter-pill">
                        {ticket.position !== undefined ? ticket.position : "—"}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={13} color="var(--admin-muted-text)" />
                        <span>
                          {ticket.tempsEstime
                            ? `${ticket.tempsEstime} min`
                            : "—"}
                        </span>
                      </div>
                    </td>
                    <td>{getStatusBadge(ticket.statut)}</td>
                    <td>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--admin-muted-text)",
                        }}
                      >
                        {ticket.dateCreation || "—"}
                      </div>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-action-icon-btn view"
                          onClick={() => setSelectedTicket(ticket)}
                          title="Voir les détails complets"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      {selectedTicket && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedTicket(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>Détails du Ticket #{selectedTicket.numero}</h3>
                <p>
                  Informations complètes sur ce passage dans la file d'attente.
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setSelectedTicket(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              
              <div
                style={{
                  padding: "16px",
                  background: "var(--admin-primary-light)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--admin-muted-text)",
                      fontWeight: 700,
                    }}
                  >
                    NUMÉRO DU TICKET
                  </span>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      fontFamily: "monospace",
                      color: "var(--admin-primary)",
                    }}
                  >
                    #{selectedTicket.numero}
                  </div>
                </div>
                <div>{getStatusBadge(selectedTicket.statut)}</div>
              </div>

              
              <div className="admin-detail-card">
                <div className="admin-detail-item">
                  <strong>Client</strong>
                  <span>
                    {selectedTicket.nomClient ||
                      selectedTicket.clientNomComplet ||
                      "—"}
                  </span>
                </div>

                <div className="admin-detail-item">
                  <strong>Établissement</strong>
                  <span>
                    {selectedTicket.nomEtablissement ||
                      selectedTicket.etablissementNom ||
                      "—"}
                  </span>
                </div>

                <div className="admin-detail-item">
                  <strong>Service Demandé</strong>
                  <span>
                    {selectedTicket.nomService ||
                      selectedTicket.serviceNom ||
                      "—"}
                  </span>
                </div>

                <div className="admin-detail-item">
                  <strong>Position dans la file</strong>
                  <span>
                    {selectedTicket.position !== undefined
                      ? selectedTicket.position
                      : "—"}
                  </span>
                </div>

                <div className="admin-detail-item">
                  <strong>Temps d'attente estimé</strong>
                  <span>
                    {selectedTicket.tempsEstime
                      ? `${selectedTicket.tempsEstime} min`
                      : "—"}
                  </span>
                </div>

                <div className="admin-detail-item">
                  <strong>Date d'émission</strong>
                  <span>{selectedTicket.dateCreation || "—"}</span>
                </div>
              </div>

              
              {selectedTicket.qrCode && (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--admin-muted-text)",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Code QR du ticket
                  </span>
                  {selectedTicket.qrCode.startsWith("data:") ||
                  selectedTicket.qrCode.length > 100 ? (
                    <img
                      src={
                        selectedTicket.qrCode.startsWith("data:")
                          ? selectedTicket.qrCode
                          : `data:image/png;base64,${selectedTicket.qrCode}`
                      }
                      alt="QR Code"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "8px",
                        border: "1px solid var(--admin-border)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: "12px",
                        background: "#f1f5f9",
                        padding: "8px",
                        borderRadius: "6px",
                        display: "inline-block",
                      }}
                    >
                      ID Unique : {selectedTicket.qrCode}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setSelectedTicket(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
