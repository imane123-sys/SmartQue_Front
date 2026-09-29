import React, { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle, Info, AlertTriangle, X, Clock } from "lucide-react";
import { Client } from "@stomp/stompjs";
import "./NotificationBell.css";

export default function NotificationBell({ topic, fetchNotifications, role }) {
  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [toast, setToast] = useState(null);

  const dropdownRef = useRef(null);

  function chargerNotifications() {
    if (!fetchNotifications) {
      return;
    }

    fetchNotifications()
      .then((reponse) => {
        let liste = [];

        if (reponse && reponse.data) {
          if (reponse.data.content) {
            liste = reponse.data.content;
          } else if (Array.isArray(reponse.data)) {
            liste = reponse.data;
          }
        }

        let listeFiltree = liste;
        if (role) {
          listeFiltree = liste.filter((notif) => {
            if (!notif.destinataireRole) {
              return true;
            }
            return notif.destinataireRole === role;
          });
        }

        setNotifications(listeFiltree);
        setUnreadCount(listeFiltree.length);
      })
      .catch((erreur) => {
        console.warn("Erreur lors du chargement des notifications :", erreur);
      });
  }

  useEffect(() => {
    chargerNotifications();
  }, [role]);

  useEffect(() => {
    if (!topic) {
      return;
    }

    let protocole = "ws:";
    if (window.location.protocol === "https:") {
      protocole = "wss:";
    }

    const host = window.location.hostname || "localhost";
    const brokerURL = `${protocole}//${host}:8080/ws`;

    const client = new Client({
      brokerURL: brokerURL,
      reconnectDelay: 4000,

      onConnect: () => {
        client.subscribe(topic, (message) => {
          try {
            const nouvelleNotif = JSON.parse(message.body);

            if (
              role &&
              nouvelleNotif.destinataireRole &&
              nouvelleNotif.destinataireRole !== role
            ) {
              return;
            }

            setNotifications((anciennes) => [nouvelleNotif, ...anciennes]);

            setUnreadCount((compteur) => compteur + 1);

            setToast(nouvelleNotif);

            setTimeout(() => {
              setToast(null);
            }, 5000);
          } catch (err) {
            console.error("Erreur lecture message WebSocket :", err);
          }
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [topic, role]);

  useEffect(() => {
    function clicExterieur(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", clicExterieur);
    return () => {
      document.removeEventListener("mousedown", clicExterieur);
    };
  }, []);

  function toggleDropdown() {
    const nouveauState = !isOpen;
    setIsOpen(nouveauState);

    if (nouveauState === true) {
      setUnreadCount(0);
      chargerNotifications();
    }
  }

  function toutMarquerCommeLu() {
    setUnreadCount(0);
  }

  function formaterDate(dateStr) {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      const heure = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const jour = date.toLocaleDateString();
      return `${heure} - ${jour}`;
    } catch (e) {
      return dateStr;
    }
  }

  function getCategorie(titre) {
    let texte = "";
    if (titre) {
      texte = titre.toLowerCase();
    }

    if (texte.includes("annulation") || texte.includes("annul")) {
      return {
        label: "Annulation",
        badgeClass: "badge-annulation",
        icon: <X size={16} color="#ef4444" />,
      };
    }

    if (texte.includes("approche") || texte.includes("approch")) {
      return {
        label: "Tour Approche",
        badgeClass: "badge-approche",
        icon: <Clock size={16} color="#d97706" />,
      };
    }

    if (texte.includes("votre tour")) {
      return {
        label: "C'est votre tour",
        badgeClass: "badge-urturn",
        icon: <AlertTriangle size={16} color="#2563eb" />,
      };
    }

    return {
      label: "Création",
      badgeClass: "badge-creation",
      icon: <CheckCircle size={16} color="#10b981" />,
    };
  }

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button
        type="button"
        className={`notification-trigger-btn ${unreadCount > 0 ? "has-unread" : ""}`}
        onClick={toggleDropdown}
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="notification-badge-count">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>
              Notifications
              <span className="notification-header-count">
                {notifications.length}
              </span>
            </h3>

            {notifications.length > 0 && (
              <button
                type="button"
                className="mark-read-btn"
                onClick={toutMarquerCommeLu}
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <Info size={28} className="notification-empty-icon" />
                <p>Aucune notification pour le moment.</p>
              </div>
            ) : (
              notifications.map((notif, index) => {
                const categorie = getCategorie(notif.titre);

                return (
                  <div key={notif.id || index} className="notification-item">
                    <div className="notification-item-icon">
                      {categorie.icon}
                    </div>

                    <div className="notification-item-content">
                      <div className="notification-item-title">
                        <span className="notif-title-text">
                          {notif.titre || "Notification"}
                        </span>
                        <span
                          className={`notif-category-badge ${categorie.badgeClass}`}
                        >
                          {categorie.label}
                        </span>
                      </div>

                      <div className="notification-item-message">
                        {notif.message}
                      </div>

                      <div className="notification-item-meta">
                        {notif.numeroTicket && (
                          <span className="notification-ticket-tag">
                            Ticket N° {notif.numeroTicket}
                          </span>
                        )}
                        <span className="notification-item-time">
                          {formaterDate(notif.dateEnvoi)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="notification-toast">
          <div className="notification-toast-content">
            <div className="notification-toast-title">
              🔔 {toast.titre || "Notification"}
            </div>
            <div className="notification-toast-message">{toast.message}</div>
            {toast.numeroTicket && (
              <div className="notification-toast-ticket">
                Ticket N° {toast.numeroTicket}
              </div>
            )}
          </div>
          <button
            type="button"
            className="notification-toast-close"
            onClick={() => setToast(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
