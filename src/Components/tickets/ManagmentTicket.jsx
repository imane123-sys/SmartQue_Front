import React, { useEffect, useState } from "react";
import { ticketApi } from "../../Api/Ticket";
import { useAuth } from "../AuthContext.jsx";
import { useParams } from "react-router-dom";
import "./ManagmentTicket.css";
import { notificationApi } from "../../Api/Notification.js";
import { Link } from "react-router-dom";

function ManagmentTicket() {
  const [ticket, setTicket] = useState({});
  const [erreur, setErreur] = useState(null);
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    ticketApi
      .reserve({ clientEmail: user.email, serviceId: id })
      .then((res) => {
        setTicket(res.data);
        notificationApi
          .notificationConfirmation(res.data.id)
          .then((res) => setMessage(res))
          .catch((err) => setErreur(err));
      })
      .catch((err) => setErreur(err));
  }, [user, id]);

  return (
    <div className="sq-ticket-page">
      <div className="sq-ticket-card">
        
        <div className="sq-ticket-hero-header">
          
          <div
            className="sq-zellige-watermark sq-zellige-top"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              width="100%"
              height="100%"
            >
              <g transform="translate(50,50)">
                <rect
                  x="-30"
                  y="-30"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="-30"
                  y="-30"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  transform="rotate(45)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <polygon
                  points="0,-42 12,-18 38,-18 18,0 28,36 0,16 -28,36 -18,0 -38,-18 -12,-18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>

          <div className="sq-header-top-row">
            
            <div className="sq-header-brand">
              <div className="sq-header-logo-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9a2 2 0 0 1 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
                  <line x1="12" y1="9" x2="12" y2="15" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="sq-header-brand-text">
                <span className="sq-brand-name">
                  Smart<span className="sq-brand-highlight">Queue</span>
                </span>
                <span className="sq-brand-slogan">
                  VOTRE TEMPS A DE LA VALEUR
                </span>
              </div>
            </div>

            
            <div className="sq-header-cursive">
              <span>Votre service,</span>
              <span>en toute sérénité</span>
            </div>
          </div>

          
          <div className="sq-header-wave-bottom" aria-hidden="true">
            <svg viewBox="0 0 500 24" preserveAspectRatio="none">
              <path
                d="M0,0 C150,22 350,22 500,0 L500,24 L0,24 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>

        
        <div className="sq-ticket-inner-content">
          
          <div className="sq-ticket-subheading">
            <span className="sq-line"></span>
            <span className="sq-subheading-text">
              <strong>VOTRE TICKET</strong> <span>ÉLECTRONIQUE</span>
            </span>
            <span className="sq-line"></span>
          </div>

          
          <div className="sq-hero-number-box">
            <div className="sq-number-left">
              <span className="sq-number-label">NUMÉRO</span>
              <span className="sq-number-val">{ticket.numero ?? "—"}</span>
            </div>

            <div className="sq-number-right">
              <div className="sq-ticket-sparkle-icon">
                <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                  <rect
                    x="7"
                    y="5"
                    width="16"
                    height="22"
                    rx="3"
                    strokeWidth="2.4"
                    stroke="#004bb5"
                    fill="#ffffff"
                  />
                  <circle
                    cx="7"
                    cy="16"
                    r="2.5"
                    fill="#f0f5fc"
                    stroke="#004bb5"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="23"
                    cy="16"
                    r="2.5"
                    fill="#f0f5fc"
                    stroke="#004bb5"
                    strokeWidth="2.2"
                  />
                  <line
                    x1="28"
                    y1="9"
                    x2="33"
                    y2="7"
                    stroke="#004bb5"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="29"
                    y1="16"
                    x2="34"
                    y2="16"
                    stroke="#004bb5"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="28"
                    y1="23"
                    x2="33"
                    y2="25"
                    stroke="#004bb5"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="sq-wait-text">
                <span>MERCI</span>
                <span>DE PATIENTER</span>
              </div>
            </div>
          </div>

          
          <div className="sq-info-card">
            <div className="sq-info-icon-circle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M3 9.5L12 4l9 5.5v1H3v-1Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <line x1="2" y1="20" x2="22" y2="20" />
                <line x1="3" y1="17" x2="21" y2="17" />
                <line x1="5" y1="10.5" x2="5" y2="17" />
                <line x1="9.5" y1="10.5" x2="9.5" y2="17" />
                <line x1="14.5" y1="10.5" x2="14.5" y2="17" />
                <line x1="19" y1="10.5" x2="19" y2="17" />
              </svg>
            </div>
            <div className="sq-info-card-text">
              <span className="sq-info-label">ÉTABLISSEMENT</span>
              <span className="sq-info-val">
                {ticket.nomEtablissement ?? "—"}
              </span>
            </div>
          </div>

          
          <div className="sq-info-card">
            <div className="sq-info-icon-circle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="3"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <line x1="8" y1="8" x2="16" y2="8" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="13" y2="16" />
              </svg>
            </div>
            <div className="sq-info-card-text">
              <span className="sq-info-label">SERVICE DEMANDÉ</span>
              <span className="sq-info-val">{ticket.nomService ?? "—"}</span>
            </div>
          </div>

          
          <div className="sq-dual-metrics-grid">
            
            <div className="sq-metric-card sq-metric-position">
              <div className="sq-micon-blue">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="sq-metric-text">
                <span className="sq-metric-label">VOTRE POSITION</span>
                <span className="sq-metric-val">{ticket.position ?? "—"}</span>
              </div>
            </div>

            
            <div className="sq-metric-card sq-metric-time">
              <div className="sq-micon-clock">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15.5 14" />
                </svg>
              </div>
              <div className="sq-metric-text">
                <span className="sq-metric-label">TEMPS D'ESTIMATION</span>
                <span className="sq-metric-val">
                  {ticket.tempsEstime
                    ? String(ticket.tempsEstime).includes("min")
                      ? ticket.tempsEstime
                      : `${ticket.tempsEstime} min`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          
          <div className="sq-ticket-creation-date">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sq-calendar-icon"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Date de création : {ticket.dateCreation ?? "—"}</span>
          </div>

          
          <div className="sq-qr-header-line">
            <span className="sq-qr-line"></span>
            <span className="sq-qr-header-text">
              Scannez ce QR Code à votre arrivée au guichet
            </span>
            <span className="sq-qr-line"></span>
          </div>

          
          <div className="sq-qr-scanner-frame">
            <span className="sq-corner-bracket sq-bracket-tl"></span>
            <span className="sq-corner-bracket sq-bracket-tr"></span>
            <span className="sq-corner-bracket sq-bracket-bl"></span>
            <span className="sq-corner-bracket sq-bracket-br"></span>

            <div className="sq-qr-code-inner">
              {ticket.qrCode && (
                <img
                  src={`data:image/png;base64,${ticket.qrCode}`}
                  alt="QR Code"
                  width="120"
                  height="120"
                  className="sq-qr-image"
                />
              )}
            </div>
          </div>
        </div>

        
        <div className="sq-ticket-footer-wave">
          
          <div className="sq-footer-wave-svg" aria-hidden="true">
            <svg viewBox="0 0 500 28" preserveAspectRatio="none">
              <path
                d="M0,28 C160,5 340,5 500,28 L500,0 L0,0 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          
          <div
            className="sq-zellige-watermark sq-zellige-bottom"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              width="100%"
              height="100%"
            >
              <g transform="translate(50,50)">
                <rect
                  x="-30"
                  y="-30"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="-30"
                  y="-30"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  transform="rotate(45)"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <polygon
                  points="0,-42 12,-18 38,-18 18,0 28,36 0,16 -28,36 -18,0 -38,-18 -12,-18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>

          <div className="sq-footer-content">
            <div className="sq-footer-left">
              <div className="sq-leaf-icon">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 7.5s-4 10.5-4 10.5c1.5-2.5 5.5-6.5 12-13z" />
                </svg>
              </div>
              <div className="sq-leaf-text">
                <span>Ensemble pour une</span>
                <span>relation durable</span>
              </div>
            </div>

            <div className="sq-footer-right">
              <span>Merci</span>
              <span>de votre confiance</span>
            </div>
          </div>
        </div>
      </div>
      <Link to="/dashboard-client">Suivre mon ticket</Link>
    </div>
  );
}

export default ManagmentTicket;
