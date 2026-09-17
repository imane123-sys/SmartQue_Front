import React from "react";
import { Ticket, Building2, Timer, Smile } from "lucide-react";
import "./Stats.css";

export const Stats = () => {
  const stats = [
    {
      id: "tickets",
      icon: Ticket,
      value: "1.4M+",
      label: "TICKETS ISSUED",
      iconBg: "rgba(0, 132, 255, 0.1)",
      iconColor: "#0084ff",
    },
    {
      id: "venues",
      icon: Building2,
      value: "850+",
      label: "PARTNER VENUES",
      iconBg: "rgba(0, 132, 255, 0.1)",
      iconColor: "#0084ff",
    },
    {
      id: "time",
      icon: Timer,
      value: "22 Min",
      label: "AVG. WAIT SAVED",
      iconBg: "rgba(16, 185, 129, 0.12)",
      iconColor: "#10b981",
    },
    {
      id: "satisfaction",
      icon: Smile,
      value: "99.4%",
      label: "SATISFACTION RATE",
      iconBg: "rgba(245, 158, 11, 0.12)",
      iconColor: "#f59e0b",
    },
  ];

  return (
    <section id="metrics" className="sq-stats-section">
      <div className="sq-container">
        <div className="sq-stats-card">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <React.Fragment key={item.id}>
                <div className="sq-stat-item">
                  <div
                    className="sq-stat-icon-wrapper"
                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  >
                    <IconComponent size={24} strokeWidth={2.2} />
                  </div>
                  <div className="sq-stat-details">
                    <div className="sq-stat-value">{item.value}</div>
                    <div className="sq-stat-label">{item.label}</div>
                  </div>
                </div>
                {index < stats.length - 1 && <div className="sq-stat-divider"></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
