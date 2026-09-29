import React, { useState } from "react";
import { Search, Clock, Building2, Layers, User, Eye, X } from "lucide-react";

export default function TicketsConsultation({
  tickets = [],
  etablissements = [],
}) {
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("ALL");
  const [filterEtab, setFilterEtab] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getClient = (t) => t.nomClient || t.clientNomComplet || "Client";
  const getService = (t) => t.nomService || t.serviceNom || "—";
  const getEtab = (t) => t.nomEtablissement || t.etablissementNom || "—";

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

  const filteredTickets = tickets.filter((t) => {
    const statut = String(t.statut || "").toUpperCase();
    const client = getClient(t).toLowerCase();
    const service = getService(t).toLowerCase();
    const etab = getEtab(t).toLowerCase();
    const searchLower = search.toLowerCase();

    const matchStatut =
      filterStatut === "ALL" ||
      statut === filterStatut ||
      (filterStatut === "ABSENT" && statut === "ANNULE");

    const matchEtab = filterEtab === "ALL" || getEtab(t) === filterEtab;

    const matchSearch =
      String(t.numero || "").includes(searchLower) ||
      client.includes(searchLower) ||
      service.includes(searchLower) ||
      etab.includes(searchLower);

    return matchStatut && matchEtab && matchSearch;
  });

  const qrCodeValue = selectedTicket?.qrCode;
  const isQrImage =
    qrCodeValue &&
    (qrCodeValue.startsWith("data:") || qrCodeValue.length > 100);
  const qrImageSrc = isQrImage
    ? qrCodeValue.startsWith("data:")
      ? qrCodeValue
      : `data:image/png;base64,${qrCodeValue}`
    : null;

  return (
    <div className="admin-tickets-view">
      <div className="admin-toolbar">
        <div className="admin-toolbar-left" style={{ flexWrap: "wrap" }}>
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par n° de ticket, client, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            value={filterEtab}
            onChange={(e) => setFilterEtab(e.target.value)}
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
                        <strong>{getClient(ticket)}</strong>
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
                        <span>{getService(ticket)}</span>
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
                        <Building2 size={14} color="var(--admin-primary)" />
                        <span>{getEtab(ticket)}</span>
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
                  <span>{getClient(selectedTicket)}</span>
                </div>
                <div className="admin-detail-item">
                  <strong>Établissement</strong>
                  <span>{getEtab(selectedTicket)}</span>
                </div>
                <div className="admin-detail-item">
                  <strong>Service Demandé</strong>
                  <span>{getService(selectedTicket)}</span>
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

              {qrCodeValue && (
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

                  {isQrImage ? (
                    <img
                      src={qrImageSrc}
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
                      ID Unique : {qrCodeValue}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pied de la modale */}
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
