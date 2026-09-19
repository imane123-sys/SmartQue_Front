import React, { useEffect, useState } from "react";
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
} from "lucide-react";

import "./Dashboardclient.css";
import { AuthContext, useAuth } from "../AuthContext";
import { ticketApi } from "../../Api/Ticket";

export default function Dashboardclient() {
  const { user } = useAuth();
  const [ticketClient, setTicketClient] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    ticketApi
      .getTicketClient(user.id)
      .then((res) => setTicketClient(res.data))
      .catch((err) => setErreur(err));
  }, []);

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

          <button className="icon-btn notification-btn">
            <Bell size={16} />
            <span className="notification-count">3</span>
          </button>

          <div className="user">
            <div className="avatar"></div>

            <div className="user-info">
              <strong>{user.email}</strong>
              <span>{user.role}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="icon-sidebar">
          <div className="sidebar-icons">
            <a href="#" className="sidebar-icon">
              <House size={17} />
            </a>

            <a href="#" className="sidebar-icon active">
              <Ticket size={17} />
            </a>
          </div>
        </aside>

        <aside className="tickets-sidebar">
          <div className="tickets-header">
            <div className="tickets-title">
              <h2>Mes tickets</h2>
              <span>8</span>
            </div>

            <button className="plus-btn">
              <Plus size={16} />
            </button>
          </div>

          <div className="tickets-list">
            {ticketClient.map((t) => (
              <div className="ticket-item" key={t.id}>
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
        </aside>

        <main className="main-content">
          <div className="page-title">
            <h1>Mon ticket</h1>
            <p>Suivi de passage et file d'attente en direct.</p>
          </div>

          <section className="main-card">
            <h2>Temps resté</h2>

            <div className="ticket-card">
              <div className="big-ticket-number">8123</div>

              <div className="ticket-information">
                <div className="ticket-number">8123</div>

                <div className="ticket-stats">
                  <div className="stat">
                    <span>Temps d'estimation</span>
                    <strong>20 min</strong>
                  </div>

                  <div className="stat">
                    <span>Votre position</span>

                    <strong>
                      <b>1</b> personne devant vous
                    </strong>
                  </div>
                </div>

                <div className="countdown">00:00:34</div>

                <button className="download-btn">
                  <Download size={16} />
                  Voir & Télécharger mon Ticket
                </button>
              </div>
            </div>

            <div className="stepper">
              <div className="step-line"></div>

              <div className="step">
                <div className="step-circle waiting">
                  <Clock size={16} />
                </div>
                <span>En attente</span>
              </div>

              <div className="step">
                <div className="step-circle current">
                  <UserCheck size={16} />
                </div>
                <span className="current-text">En cours</span>
              </div>

              <div className="step">
                <div className="step-circle done">
                  <Check size={16} />
                </div>
                <span>Terminé</span>
              </div>

              <div className="step">
                <div className="step-circle cancelled-step">
                  <X size={16} />
                </div>
                <span>Annulé</span>
              </div>
            </div>

            <div className="cancel-area">
              <button className="cancel-btn">
                <CircleX size={16} />
                Annuler le ticket
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
