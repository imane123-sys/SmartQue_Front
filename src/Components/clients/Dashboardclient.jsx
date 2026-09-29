import React, { useState, useEffect } from "react";
import {
  House,
  Ticket,
  Plus,
  Check,
  X,
  Clock,
  UserCheck,
  Download,
  CircleX,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import "./DashboardClient.css";
import { useAuth } from "../AuthContext";
import { ticketApi } from "../../Api/Ticket";
import { notificationApi } from "../../Api/Notification";
import NotificationBell from "../notifications/NotificationBell";

function Countdown({ initialMinutes, idTicket, onMinuteElapsed }) {
  const [secondes, setSecondes] = useState((initialMinutes || 1) * 60);

  useEffect(() => {
    const totalSecondes = (initialMinutes || 1) * 60;
    setSecondes(totalSecondes);
  }, [initialMinutes, idTicket]);

  useEffect(() => {
    if (secondes <= 0) return;

    const timer = setInterval(() => {
      const nouvellesSecondes = secondes - 1;
      setSecondes(nouvellesSecondes);

      if (nouvellesSecondes % 60 === 0) {
        const minutesRestantes = Math.floor(nouvellesSecondes / 60);
        onMinuteElapsed(idTicket, minutesRestantes);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondes, idTicket, onMinuteElapsed]);

  const minutes = Math.floor(secondes / 60);
  const sec = secondes % 60;

  let secTexte = sec;
  if (sec < 10) {
    secTexte = "0" + sec;
  }

  return (
    <div>
      {minutes}:{secTexte}
    </div>
  );
}

export default function Dashboardclient() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [ticketClient, setTicketClient] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [erreur, setErreur] = useState("");
  const [notifsEnvoyees, setNotifsEnvoyees] = useState([]);

  function handleGetTickets() {
    if (!user || !user.id) return;

    ticketApi
      .getTicketClient(user.id)
      .then((res) => {
        const tickets = res.data || [];
        setTicketClient(tickets);

        if (tickets.length > 0) {
          const savedTicketId = localStorage.getItem("selectedTicketId");

          let ticketChoisi = tickets.find(
            (t) => String(t.id) === String(savedTicketId),
          );

          if (!ticketChoisi) {
            ticketChoisi = tickets[0];
          }

          setSelectedTicket(ticketChoisi);
          localStorage.setItem("selectedTicketId", ticketChoisi.id);
        }
      })
      .catch((err) => {
        setErreur(err?.message || "Erreur de chargement");
      });
  }

  useEffect(() => {
    handleGetTickets();
  }, [user?.id]);

  function fetchClientNotifications() {
    if (!user || !user.id) {
      return Promise.resolve({ data: [] });
    }
    return notificationApi.getNotificationsClient(user.id);
  }

  function handleMinuteElapsed(idTicket, newMinutes) {
    ticketApi
      .updateTempsEstime(idTicket, newMinutes)
      .then(() => {
        if (selectedTicket && selectedTicket.id === idTicket) {
          setSelectedTicket({ ...selectedTicket, tempsEstime: newMinutes });
        }

        const nouvelleListe = ticketClient.map((t) => {
          if (t.id === idTicket) {
            return { ...t, tempsEstime: newMinutes };
          }
          return t;
        });
        setTicketClient(nouvelleListe);

        const dejaEnvoye = notifsEnvoyees.includes(idTicket);
        if (newMinutes <= 10 && newMinutes > 0 && !dejaEnvoye) {
          setNotifsEnvoyees([...notifsEnvoyees, idTicket]);
          const currentPos = selectedTicket?.position || 1;
          notificationApi
            .tourApproche(idTicket, currentPos, newMinutes)
            .catch(console.warn);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function annulerTicket(idTicket) {
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
  }

  function handleLogout() {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
    }
    localStorage.removeItem("ticket");
    localStorage.removeItem("selectedTicketId");
    navigate("/login");
  }

  const statut = selectedTicket
    ? String(selectedTicket.statut).toUpperCase()
    : "";

  const isEnAttente = statut.includes("ATTENTE");
  const isEnCours = statut.includes("COURS");
  const isTermine = statut.includes("TERMIN");
  const isAnnule = statut.includes("ABSENT");

  let largeurBarre = "0%";
  if (isEnCours) {
    largeurBarre = "33.33%";
  } else if (isTermine) {
    largeurBarre = "66.66%";
  }

  let classeEtape1 = "waiting";
  if (isEnAttente) {
    classeEtape1 = "current";
  } else if (isEnCours || isTermine) {
    classeEtape1 = "done";
  }

  let classeEtape2 = "waiting";
  if (isEnCours) {
    classeEtape2 = "current";
  } else if (isTermine) {
    classeEtape2 = "done";
  }

  let classeEtape3 = isTermine ? "current" : "waiting";
  let classeEtape4 = isAnnule ? "cancelled-step" : "waiting";

  let initiales = "CL";
  if (user && user.email) {
    initiales = user.email.slice(0, 2).toUpperCase();
  }

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
            <Link
              to="/Etablissement-service"
              className="sidebar-icon"
              title="Établissements & Services"
            >
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
              <div className="admin-avatar">{initiales}</div>
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
                    width: largeurBarre,
                    backgroundColor: "#10b981",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>

              <div className="step">
                <div className={`step-circle ${classeEtape1}`}>
                  <Clock size={14} />
                </div>
                <span className={isEnAttente ? "current-text" : ""}>
                  En attente
                </span>
              </div>

              <div className="step">
                <div className={`step-circle ${classeEtape2}`}>
                  <UserCheck size={14} />
                </div>
                <span className={isEnCours ? "current-text" : ""}>
                  En cours
                </span>
              </div>

              <div className="step">
                <div className={`step-circle ${classeEtape3}`}>
                  <Check size={14} />
                </div>
                <span className={isTermine ? "current-text" : ""}>Terminé</span>
              </div>

              <div className="step">
                <div className={`step-circle ${classeEtape4}`}>
                  <X size={14} />
                </div>
                <span className={isAnnule ? "cancelled-text" : ""}>Annulé</span>
              </div>
            </div>

            <div className="cancel-area">
              <button
                className="cancel-btn"
                onClick={() => {
                  if (selectedTicket) {
                    annulerTicket(selectedTicket.id);
                  }
                }}
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
