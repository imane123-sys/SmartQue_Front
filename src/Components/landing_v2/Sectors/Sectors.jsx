import React from "react";
import { ChevronRight, ArrowRight, Stethoscope, Landmark, FileText, ShoppingBag } from "lucide-react";
import "./Sectors.css";

export const Sectors = ({ onSelectSector, onViewAllServices }) => {
  const sectors = [
    {
      id: "healthcare",
      icon: Stethoscope,
      title: "Clinics & Healthcare",
      desc: "Patients can wait from their vehicle or home, reducing infectious exposure in waiting rooms while tracking doctor consultations in real time.",
      featured: false,
      iconBg: "rgba(168, 85, 247, 0.1)",
      iconColor: "#9333ea",
    },
    {
      id: "banking",
      icon: Landmark,
      title: "Banking & Finance",
      desc: "Smart ticket routing for VIP accounts, foreign exchange, cashier deposits, and private advisors without paper tickets or chaotic lobby crowding.",
      featured: true,
      badgeText: "MOST POPULAR",
      iconBg: "#0084ff",
      iconColor: "#ffffff",
    },
    {
      id: "government",
      icon: FileText,
      title: "Government & DMV",
      desc: "End frustrating 4-hour citizen lines. Remote check-ins, multi-counter scheduling, and passport/driver license processing.",
      featured: false,
      iconBg: "rgba(245, 158, 11, 0.1)",
      iconColor: "#d97706",
    },
    {
      id: "retail",
      icon: ShoppingBag,
      title: "Retail & Repair Centers",
      desc: "Let shoppers browse surrounding stores or grab a coffee while retaining their spot for Genius Bar repairs, fitting rooms, and returns.",
      featured: false,
      iconBg: "rgba(16, 185, 129, 0.1)",
      iconColor: "#059669",
    },
  ];

  return (
    <section id="services" className="sq-sectors-section">
      <div className="sq-container">
        <div className="sq-sectors-header">
          <div>
            <div className="sq-sectors-pretitle">HOW CAN WE HELP?</div>
            <h2 className="sq-sectors-headline">
              Specialized Queuing Solutions <br />
              For Every Industry
            </h2>
          </div>
          <button
            type="button"
            className="sq-btn-view-all"
            onClick={() => onViewAllServices && onViewAllServices()}
          >
            <span>View All Services</span>
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="sq-sectors-grid">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className={`sq-sector-card ${sec.featured ? "featured" : ""}`}
                onClick={() => onSelectSector && onSelectSector(sec.id)}
              >
                {sec.featured && sec.badgeText && (
                  <div className="sq-sector-badge">{sec.badgeText}</div>
                )}

                <div
                  className="sq-sector-icon-wrap"
                  style={{
                    backgroundColor: sec.iconBg,
                    color: sec.iconColor,
                  }}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </div>

                <h3 className="sq-sector-title">{sec.title}</h3>
                <p className="sq-sector-desc">{sec.desc}</p>

                <div className={`sq-sector-link ${sec.featured ? "featured-link" : ""}`}>
                  <span>Learn More</span>
                  <ArrowRight size={15} strokeWidth={2.4} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
