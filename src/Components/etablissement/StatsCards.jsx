import React, { useEffect, useState } from "react";
import { Ticket, Users, Timer, CheckCircle } from "lucide-react";
import { ticketApi } from "../../Api/Ticket";
import { useAuth } from "../AuthContext";

const StatCard = ({ icon, title, value, children }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-icon">{icon}</div>
        <span>{title}</span>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-description">{children}</div>
    </div>
  );
};

const StatsCards = () => {
  const [historique, setHistorique] = useState({
    countStatut_EN_ATTENTE: 0,
    countStatut_EN_COURS: 0,
    countStatut_TERMINE: 0,
    countStatut_ABSENT: 0,
  });
  const { user } = useAuth();
  const [erreur, setErreur] = useState("");

  const getHistorique = () => {
    ticketApi
      .getHistorique(user.id)
      .then((res) => setHistorique(res.data))
      .catch((err) => setErreur(err));
    console.log(historique);
  };
  useEffect(() => {
    if (user?.id) {
      getHistorique();
      
    }
  }, [user?.id]);
  return (
    <div className="stats-grid">
      <StatCard
        icon={<Ticket size={18} />}
        title="les tickets Absents"
        value={historique.countStatut_ABSENT}
      >
        <span className="positive"></span>
      </StatCard>

      <StatCard
        icon={<Users size={18} />}
        title="les tickets en cours"
        value={historique.countStatut_EN_COURS}
      ></StatCard>

      <StatCard
        icon={<Timer size={18} />}
        title="les tickets en attente"
        value={historique.countStatut_EN_ATTENTE}
      ></StatCard>

      <StatCard
        icon={<CheckCircle size={18} />}
        title="les tickets Terminés"
        value={historique.countStatut_TERMINE}
      ></StatCard>
    </div>
  );
};

export default StatsCards;
