import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  House,
  Ticket,
  Bell,
  Plus,
  Check,
  X,
  Clock,
  UserCheck,
  Download,
  CircleX,
  LogOut,
} from "lucide-react";

import "./DashboardClient.css";
import { useAuth } from "../AuthContext";
import { ticketApi } from "../../Api/Ticket";
import { notificationApi } from "../../Api/Notification";
import NotificationBell from "../notifications/NotificationBell";
import { Link, useNavigate } from "react-router-dom";

function Countdown({ initialMinutes, idTicket, onMinuteElapsed }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    setSeconds((initialMinutes || 1) * 60);
  }, [idTicket, initialMinutes]);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        const newSeconds = prev - 1;

        if (newSeconds % 60 === 0) {
          const newMinutes = Math.floor(newSeconds / 60);
          onMinuteElapsed(idTicket, newMinutes);
        }

        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [idTicket, onMinuteElapsed]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      {minutes}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  );
}

export default function Dashboardclient() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ticketClient, setTicketClient] = useState([]);
  const [erreur, setErreur] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

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

  const statutNormalized = selectedTicket?.statut
    ? String(selectedTicket.statut)
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\s-]/g, "_")
    : "";

  const isEnAttente = statutNormalized === "EN_ATTENTE";
  const isEnCours = statutNormalized === "EN_COURS";
  const isTermine = statutNormalized === "TERMINE";
  const isAnnule =
    statutNormalized === "ANNULE" || statutNormalized === "ABSENT";

  const handleGetTickets = () => {
    if (!user?.id) return;
    ticketApi
      .getTicketClient(user.id)
      .then((res) => {
        const tickets = Array.isArray(res.data) ? res.data : [];
        setTicketClient(tickets);

        if (tickets.length > 0) {
          const savedTicketId = localStorage.getItem("selectedTicketId");
          const freshTicket =
            tickets.find((t) => String(t.id) === String(savedTicketId)) ||
            tickets[0];
          setSelectedTicket(freshTicket);
          localStorage.setItem("selectedTicketId", freshTicket.id);
        }
      })
      .catch((err) => setErreur(err?.message || "Erreur de chargement"));
  };

  useEffect(() => {
    handleGetTickets();
  }, [user?.id]);

  const approachedTicketsRef = useRef(new Set());

  const fetchClientNotifications = useCallback(() => {
    if (!user?.id) return Promise.resolve({ data: [] });
    return notificationApi.getNotificationsClient(user.id);
  }, [user?.id]);

  const handleMinuteElapsed = (idTicket, newMinutes) => {
    ticketApi
      .updateTempsEstime(idTicket, newMinutes)
      .then(() => {
        setSelectedTicket((prev) =>
          prev && prev.id === idTicket
            ? { ...prev, tempsEstime: newMinutes }
            : prev,
        );
        setTicketClient((prev) =>
          prev.map((t) =>
            t.id === idTicket ? { ...t, tempsEstime: newMinutes } : t,
          ),
        );

        if (newMinutes <= 10 && newMinutes > 0 && !approachedTicketsRef.current.has(idTicket)) {
          approachedTicketsRef.current.add(idTicket);
          const currentPos = selectedTicket?.position || 1;
          notificationApi.tourApproche(idTicket, currentPos, newMinutes).catch(console.warn);
        }
      })
      .catch(console.error);
  };

  const annulerTicket = (idTicket) => {
    ticketApi
      .annuler(idTicket, user.id)
      .then((res) => {
        setSelectedTicket(res.data);
        return notificationApi.annulerTicket(idTicket);
      })
      .then(() => {
        handleGetTickets();
      })
      .catch((err) => {
        setErreur(err?.message || "Erreur lors de l'annulation");
      });
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="brand-area">
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

        <div className="top-actions">
          {user?.id && (
            <NotificationBell
              role="CLIENT"
              topic={`/topic/notifications/${user.id}`}
              fetchNotifications={fetchClientNotifications}
            />
          )}
        </div>
      </header>

      <div className="layout">
        <aside className="icon-sidebar">
          <div className="sidebar-icons">
            <Link to="/Etablissement-service" className="sidebar-icon" title="Établissements & Services">
              <House size={16} />
            </Link>
            <a href="#" className="sidebar-icon active">
              <Ticket size={16} />
            </a>
          </div>
        </aside>

        <aside className="tickets-sidebar">
          <div className="tickets-header">
            <div className="tickets-title">
              <h2>Mes tickets</h2>
              <span>{ticketClient.length}</span>
            </div>
            <button className="plus-btn">
              <Plus size={15} />
            </button>
          </div>

          <div className="tickets-list">
            {ticketClient.map((t) => (
              <div
                className={`ticket-item ${selectedTicket?.id === t.id ? "active" : ""}`}
                key={t.id}
                onClick={() => {
                  setSelectedTicket(t);
                  localStorage.setItem("selectedTicketId", t.id);
                }}
              >
                <div className="ticket-top">
                  <span>{t.statut}</span>
                </div>
                <div className="ticket-bottom">
                  <strong>{t.numero}</strong>
                  <small>{t.nomEtablissement}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="tickets-sidebar-footer">
            <div className="admin-profile-box">
              <div className="admin-avatar">
                {user?.email ? user.email.slice(0, 2).toUpperCase() : "CL"}
              </div>
              <div className="admin-profile-meta">
                <strong>{user?.email}</strong>
                <span>Client</span>
              </div>
            </div>

            <button
              type="button"
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Se déconnecter"
            >
              <LogOut size={15} />
            </button>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-title">
            <h1>Mon ticket</h1>
            <p>Suivi de passage et file d'attente en direct.</p>
          </div>

          <section className="main-card">
            <h2>Temps resté</h2>

            <div className="ticket-card">
              <div className="big-ticket-number">{selectedTicket?.numero}</div>

              <div className="ticket-information">
                <div className="ticket-number">{selectedTicket?.numero}</div>

                <div className="ticket-stats">
                  <div className="stat">
                    <span>Temps d'estimation</span>
                    <strong>{selectedTicket?.tempsEstime} min</strong>
                  </div>

                  <div className="stat">
                    <span>Votre position</span>
                    <strong>
                      <b>{selectedTicket?.position}</b> personne devant vous
                    </strong>
                  </div>
                  <div className="stat">
                    <span>Statut ticket</span>
                    <strong>
                      <b>{selectedTicket?.statut}</b>
                    </strong>
                  </div>
                </div>

                <div className="countdown">
                  {selectedTicket && (
                    <Countdown
                      initialMinutes={selectedTicket.tempsEstime || 1}
                      idTicket={selectedTicket.id}
                      onMinuteElapsed={handleMinuteElapsed}
                    />
                  )}
                  min
                </div>

                <Link
                  to={`/reserver-ticket/${selectedTicket?.id}`}
                  className="download-btn"
                >
                  <Download size={14} />
                  Voir mon Ticket
                </Link>
              </div>
            </div>

            <div className="stepper">
              <div className="step-line">
                <div
                  style={{
                    height: "100%",
                    width: isEnCours ? "33.33%" : isTermine ? "66.66%" : "0%",
                    backgroundColor: "#10b981",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>

              <div className="step">
                <div
                  className={`step-circle ${
                    isEnAttente
                      ? "current"
                      : isEnCours || isTermine
                        ? "done"
                        : "waiting"
                  }`}
                >
                  <Clock size={14} />
                </div>
                <span className={isEnAttente ? "current-text" : ""}>
                  En attente
                </span>
              </div>

              <div className="step">
                <div
                  className={`step-circle ${
                    isEnCours ? "current" : isTermine ? "done" : "waiting"
                  }`}
                >
                  <UserCheck size={14} />
                </div>
                <span className={isEnCours ? "current-text" : ""}>
                  En cours
                </span>
              </div>

              <div className="step">
                <div
                  className={`step-circle ${isTermine ? "current" : "waiting"}`}
                >
                  <Check size={14} />
                </div>
                <span className={isTermine ? "current-text" : ""}>Terminé</span>
              </div>

              <div className="step">
                <div
                  className={`step-circle ${isAnnule ? "cancelled-step" : "waiting"}`}
                >
                  <X size={14} />
                </div>
                <span className={isAnnule ? "cancelled-text" : ""}>Annulé</span>
              </div>
            </div>

            <div className="cancel-area">
              <button
                className="cancel-btn"
                onClick={() =>
                  selectedTicket && annulerTicket(selectedTicket.id)
                }
              >
                <CircleX size={14} />
                Annuler le ticket
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
