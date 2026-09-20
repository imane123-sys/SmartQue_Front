import React, { useState } from "react";
import { Ticket, Users, Timer, CheckCircle } from "lucide-react";
// import { etablissementApi } from "../../Api/Etablissement";

// const [historique, setHistorique] = useState({});
// const [erreur, setErreur] = useState("");

// const getHistorique = (idEtablissement) => {
//   etablissementApi
//     .getHistorique(idEtablissement)
//     .then((res) => setHistorique(res.data))
//     .catch((err) => setErreur(err));
// };

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
  return (
    <div className="stats-grid">
      <StatCard
        icon={<Ticket size={18} />}
        title="Total Tickets Today"
        value="42"
      >
        <span className="positive">+23.8%</span> from yesterday
      </StatCard>

      <StatCard icon={<Users size={18} />} title="Currently Waiting" value="4">
        Next call in <strong>3 min</strong> · 04 in line
      </StatCard>

      <StatCard
        icon={<Timer size={18} />}
        title="Average Waiting Time"
        value="14m"
      >
        <span className="positive">-2.4m</span> vs benchmark · TRIAGE
      </StatCard>

      <StatCard
        icon={<CheckCircle size={18} />}
        title="Completed Today"
        value="38"
      >
        <strong>90.4%</strong> completion · Last at 10:54
      </StatCard>
    </div>
  );
};

export default StatsCards;
