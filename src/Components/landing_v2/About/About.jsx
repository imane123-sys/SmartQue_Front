import React, { useState } from "react";
import {
  ArrowRight,
  Smartphone,
  Clock,
  Bell,
  UserX,
  Users,
  BellRing,
  BarChart3,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

export const About = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const tabData = {
    clients: {
      tagline: "Séduire les Citoyens & Clients",
      title: "Reprenez le contrôle de votre temps libre",
      description:
        "Fini l'attente interminable assis dans une salle d'attente bondée. SmartQueue digitalise votre accueil et vous alerte au moment idéal.",
      features: [
        {
          icon: Smartphone,
          title: "Zéro papier",
          desc: "Votre ticket et votre QR Code sécurisé directement sur votre smartphone.",
        },
        {
          icon: Clock,
          title: "Estimation précise",
          desc: "Calcul intelligent du temps restant basé sur la durée moyenne de chaque consultation.",
        },
        {
          icon: Bell,
          title: "Alertes intelligentes",
          desc: "Notifications SMS & Web : « Votre tour approche » et « C'est à vous au guichet ».",
        },
        {
          icon: UserX,
          title: "Annulation facile",
          desc: "Un imprévu ? Annulez votre ticket en un clic pour libérer votre place automatiquement.",
        },
      ],
    },
    etablissements: {
      tagline: "Convaincre les Établissements & Professionnels",
      title: "Fluidifiez votre accueil et pilotez vos flux en direct",
      description:
        "Cliniques, banques, mairies, commerces : offrez à vos équipes un guichet numérique ultra-performant et apaisez votre hall d'accueil.",
      features: [
        {
          icon: Users,
          title: "Désengorgement des salles d'attente",
          desc: "Réduisez le stress, les tensions d'attroupement et les abandons de file.",
        },
        {
          icon: BellRing,
          title: "Guichet numérique intuitif",
          desc: "Appel du ticket suivant en un clic (appelerTicketSuivant) et dispatch multi-guichets.",
        },
        {
          icon: BarChart3,
          title: "Tableau de bord & Historique",
          desc: "Statistiques en temps réel : tickets en attente, en cours, terminés et absents.",
        },
        {
          icon: MapPin,
          title: "Visibilité accrue",
          desc: "Référencement immédiat de vos services sur le catalogue et la carte géolocalisée.",
        },
      ],
    },
  };

  const current = tabData[activeTab];

  return (
    <section id="etablissements" className="sq-about-section">
      <div className="sq-container sq-about-grid">
        <div className="sq-about-left">
          <div className="sq-about-img-box">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85"
              alt="Utilisatrice SmartQueue souriante avec smartphone"
              className="sq-about-img"
            />
            <div className="sq-about-badge-green">
              <div className="sq-badge-green-num">35+</div>
              <div className="sq-badge-green-text">
                MINUTES
                <br />
                GAGNÉES PAR VISITE
              </div>
            </div>
          </div>
        </div>

        <div className="sq-about-right">
          <div className="sq-about-pretitle">{current.tagline}</div>
          <h2 className="sq-about-headline">{current.title}</h2>
          <p className="sq-about-desc">{current.description}</p>

          <div className="sq-about-tabs">
            <button
              type="button"
              className={`sq-tab-btn ${activeTab === "clients" ? "active" : ""}`}
              onClick={() => setActiveTab("clients")}
            >
              Pour les Citoyens / Clients
            </button>
            <button
              type="button"
              className={`sq-tab-btn ${activeTab === "etablissements" ? "active" : ""}`}
              onClick={() => setActiveTab("etablissements")}
            >
              Pour les Établissements & Pros
            </button>
          </div>

          <div className="sq-target-features-grid">
            {current.features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="sq-target-feat-item">
                  <div className="sq-target-feat-icon">
                    <Icon size={16} strokeWidth={2.4} />
                  </div>
                  <div>
                    <h4 className="sq-target-feat-title">{feat.title}</h4>
                    <p className="sq-target-feat-desc">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
