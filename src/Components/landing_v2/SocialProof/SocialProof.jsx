import React from "react";
import { Smile, Building2, Ticket, Clock, Star, Quote } from "lucide-react";
import "./SocialProof.css";

export const SocialProof = () => {
  const stats = [
    {
      value: "0 min",
      label: "DE STRESS DEBOUT",
      desc: "Attendez où vous voulez",
      icon: Clock,
      color: "#0084ff",
      bg: "rgba(0, 132, 255, 0.1)",
    },
    {
      value: "+850",
      label: "ÉTABLISSEMENTS",
      desc: "Cliniques, banques & mairies",
      icon: Building2,
      color: "#0084ff",
      bg: "rgba(0, 132, 255, 0.1)",
    },
    {
      value: "1.4M+",
      label: "TICKETS GÉRÉS",
      desc: "Distribués avec succès",
      icon: Ticket,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.1)",
    },
    {
      value: "99.4%",
      label: "SATISFACTION",
      desc: "Avis usagers vérifiés",
      icon: Smile,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)",
    },
  ];

  const testimonials = [
    {
      role: "Particulier / Usagère",
      quote: "J'ai pu attendre chez moi et je suis arrivée pile au moment où mon numéro a été appelé ! Quel soulagement de ne plus perdre une demi-journée assise au milieu des microbes.",
      author: "Sarah L.",
      establishment: "Patiente à l'Hôpital Saint-Louis",
      rating: 5,
    },
    {
      role: "Gestionnaire d'établissement",
      quote: "Les salles d'attente sont calmes et nos équipes travaillent avec beaucoup plus de sérénité. La console de dispatch est intuitive et nos usagers sont ravis de l'accueil.",
      author: "Marc D.",
      establishment: "Directeur de Pôle Médical",
      rating: 5,
    },
  ];

  return (
    <section className="sq-social-section">
      <div className="sq-container">
        
        <div className="sq-social-stats-card">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={idx}>
                <div className="sq-social-stat-item">
                  <div
                    className="sq-social-stat-icon"
                    style={{ backgroundColor: s.bg, color: s.color }}
                  >
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="sq-social-stat-val">{s.value}</div>
                    <div className="sq-social-stat-label">{s.label}</div>
                    <div className="sq-social-stat-sub">{s.desc}</div>
                  </div>
                </div>
                {idx < stats.length - 1 && <div className="sq-social-divider"></div>}
              </React.Fragment>
            );
          })}
        </div>

        
        <div className="sq-testimonials-header">
          <div className="sq-social-pretitle">PREUVE SOCIALE & RETOURS D'EXPÉRIENCE</div>
          <h3 className="sq-testimonials-headline">Ils ont transformé leur façon d'attendre</h3>
        </div>

        <div className="sq-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="sq-testimonial-card">
              <div className="sq-tcard-top">
                <div className="sq-tcard-stars">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="sq-tcard-role-badge">{t.role}</span>
              </div>

              <p className="sq-tcard-quote">« {t.quote} »</p>

              <div className="sq-tcard-author-info">
                <div className="sq-tcard-avatar">{t.author.charAt(0)}</div>
                <div>
                  <div className="sq-tcard-name">{t.author}</div>
                  <div className="sq-tcard-est">{t.establishment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
