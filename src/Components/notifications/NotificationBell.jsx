import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bell, CheckCircle, Info, AlertTriangle, X, Clock, CalendarCheck } from "lucide-react";
import { Client } from "@stomp/stompjs";
import "./NotificationBell.css";

export default function NotificationBell({ topic, fetchNotifications, role }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const dropdownRef = useRef(null);
  const fetchRef = useRef(fetchNotifications);

  useEffect(() => {
    fetchRef.current = fetchNotifications;
  }, [fetchNotifications]);

  const loadNotifications = useCallback(() => {
    if (!fetchRef.current) return;

    fetchRef.current()
      .then((response) => {
        const raw = response?.data?.content || (Array.isArray(response?.data) ? response.data : []);

        const filtered = role
          ? raw.filter((n) => !n.destinataireRole || n.destinataireRole === role)
          : raw;

        setNotifications(filtered);
        setUnreadCount(filtered.length);
      })
      .catch((error) => {
        console.warn("[NotificationBell] Erreur chargement:", error?.message);
      });
  }, [role]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    if (!topic) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.hostname || "localhost";
    const brokerURL = `${protocol}//${host}:8080/ws`;

    const client = new Client({
      brokerURL,
      reconnectDelay: 4000,
      onConnect: () => {
        client.subscribe(topic, (message) => {
          try {
            const newNotif = JSON.parse(message.body);

            if (role && newNotif.destinataireRole && newNotif.destinataireRole !== role) {
              return;
            }

            setNotifications((prevList) => [newNotif, ...prevList]);
            setUnreadCount((count) => count + 1);
            setToast(newNotif);

            setTimeout(() => {
              setToast(null);
            }, 5000);
          } catch (err) {
            console.error("[NotificationBell] Erreur message:", err);
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = () => {
    setUnreadCount(0);
  };

  const toggleDropdown = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setUnreadCount(0);
      loadNotifications();
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return `${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${date.toLocaleDateString()}`;
    } catch {
      return dateStr;
    }
  };

  const getNotificationCategory = (titre = "") => {
    const lower = titre.toLowerCase();
    if (lower.includes("annulation") || lower.includes("annul")) {
      return {
        label: "Annulation",
        badgeClass: "badge-annulation",
        icon: <X size={16} color="#ef4444" />,
      };
    }
    if (lower.includes("approche") || lower.includes("approch")) {
      return {
        label: "Tour Approche",
        badgeClass: "badge-approche",
        icon: <Clock size={16} color="#d97706" />,
      };
    }
    if (lower.includes("votre tour") || lower.includes("c'est votre tour")) {
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
  };

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
              <span className="notification-header-count">{notifications.length}</span>
            </h3>
            {notifications.length > 0 && (
              <button
                type="button"
                className="mark-read-btn"
                onClick={handleMarkAsRead}
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
                const category = getNotificationCategory(notif.titre);
                return (
                  <div key={notif.id || index} className="notification-item">
                    <div className="notification-item-icon">
                      {category.icon}
                    </div>
                    <div className="notification-item-content">
                      <div className="notification-item-title">
                        <span className="notif-title-text">{notif.titre || "Notification"}</span>
                        <span className={`notif-category-badge ${category.badgeClass}`}>
                          {category.label}
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
                          {formatDate(notif.dateEnvoi)}
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
            <div className="notification-toast-message">
              {toast.message}
            </div>
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
