import React from "react";
import { Search, Ticket, Coffee, BellRing } from "lucide-react";
import "./HowItWorks.css";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Trouvez votre établissement",
      desc: "Recherchez l'établissement le plus proche proposant le service dont vous avez besoin.",
      accent: "#0084ff",
      bg: "rgba(0, 132, 255, 0.08)",
    },
    {
      step: "02",
      icon: Ticket,
      title: "Prenez votre e-Ticket",
      desc: "Réservez votre place en 1 clic et recevez instantanément votre ticket digital avec son QR code unique.",
      accent: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)",
    },
    {
      step: "03",
      icon: Coffee,
      title: "Suivez la file en liberté",
      desc: "Restez chez vous, prenez un café ou faites vos courses : consultez votre position et temps d'attente en direct.",
      accent: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)",
    },
    {
      step: "04",
      icon: BellRing,
      title: "Passez sans attendre",
      desc: "Dès que vous recevez l'alerte « Votre tour approche », présentez votre QR Code au guichet !",
      accent: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.08)",
    },
  ];

  return (
    <section id="comment-ca-marche" className="sq-how-section">
      <div className="sq-container">
        
        <div className="sq-how-header">
          <div className="sq-how-pretitle">EXPÉRIENCE CITOYENNE MODERNE</div>
          <h2 className="sq-how-headline">Comment ça marche ?</h2>
          <p className="sq-how-subtitle">
            Un parcours fluide en 4 étapes simples pour en finir avec l'attente physique.
          </p>
        </div>

        
        <div className="sq-how-grid">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="sq-how-card">
                <div className="sq-how-card-top">
                  <div
                    className="sq-how-icon-box"
                    style={{ backgroundColor: item.bg, color: item.accent }}
                  >
                    <IconComponent size={22} strokeWidth={2.2} />
                  </div>
                  <span className="sq-how-step-num">{item.step}</span>
                </div>

                <h3 className="sq-how-step-title">{item.title}</h3>
                <p className="sq-how-step-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
