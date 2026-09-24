import React from "react";
import { Ticket } from "lucide-react";
import { useAuth } from "../AuthContext";
import { notificationApi } from "../../Api/Notification";
import NotificationBell from "../notifications/NotificationBell";

export default function Topbar() {
  const { user } = useAuth();

  const fetchEtabNotifications = React.useCallback(() => {
    if (!user?.id) return Promise.resolve({ data: [] });
    return notificationApi.getNotificationsEtablissement(user.id);
  }, [user?.id]);

  return (
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

      <div className="topbar-actions">
        {user?.id && (
          <NotificationBell
            topic={`/topic/notifications/etablissement/${user.id}`}
            fetchNotifications={fetchEtabNotifications}
          />
        )}

        <div className="top-avatar">
          {user?.email ? user.email.charAt(0).toUpperCase() : "E"}
        </div>
      </div>
    </header>
  );
}

