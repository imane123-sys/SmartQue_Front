import React from "react";
import { QrCode, MapPin, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import "./UniqueFeatures.css";

export const UniqueFeatures = () => {
  const features = [
    {
      id: "qr",
      icon: QrCode,
      tag: "VALIDATION INSTANTANÉE",
      title: "Le QR Code Sécurisé",
      desc: "Chaque réservation génère automatiquement un QR Code crypté unique. À votre arrivée, le guichetier ou la borne scanne votre code pour une prise en charge immédiate et sans friction.",
      points: [
        "Horodatage et signature numérique anti-fraude",
        "Compatible tous smartphones et impression papier",
        "Validation en moins de 2 secondes au guichet",
      ],
      iconBg: "rgba(0, 132, 255, 0.1)",
      iconColor: "#0084ff",
      featured: true,
    },
    {
      id: "geo",
      icon: MapPin,
      tag: "ALGORITHME GÉOGRAPHIQUE",
      title: "La Géolocalisation Intelligente",
      desc: "Recherchez les établissements par rayon kilométrique (5, 10, 20 km) grâce à notre formule Haversine intégrée. Le système compare l'attente et votre temps de trajet pour vous faire partir au bon moment.",
      points: [
        "Calcul d'itinéraire et de distance précis",
        "Estimation du temps de trajet en direct",
        "Recommandation des heures creuses",
      ],
      iconBg: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981",
      featured: false,
    },
    {
      id: "multi",
      icon: Layers,
      tag: "ARCHITECTURE MODULAIRE",
      title: "La Gestion Multi-Services",
      desc: "Un même établissement peut piloter plusieurs guichets et files d'attente indépendantes en simultané (ex: Guichet 1 - Dépôt rapide, Guichet 2 - Rendez-vous spécialisé, Guichet 3 - Urgences).",
      points: [
        "Files prioritaires et réaffectation dynamique",
        "Équilibrage de charge entre guichetiers",
        "Historique détaillé et statistiques par service",
      ],
      iconBg: "rgba(245, 158, 11, 0.1)",
      iconColor: "#d97706",
      featured: false,
    },
  ];

  return (
    <section className="sq-unique-section">
      <div className="sq-container">
        <div className="sq-unique-header">
          <div className="sq-unique-pretitle">TECHNOLOGIE & INNOVATION</div>
          <h2 className="sq-unique-headline">Nos Fonctionnalités Exclusives</h2>
          <p className="sq-unique-desc">
            Des outils de pointe développés pour garantir une fiabilité totale aux usagers et une
            simplicité déconcertante aux établissements.
          </p>
        </div>

        <div className="sq-unique-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className={`sq-unique-card ${f.featured ? "featured" : ""}`}>
                <div
                  className="sq-unique-icon-wrap"
                  style={{ backgroundColor: f.iconBg, color: f.iconColor }}
                >
                  <Icon size={24} strokeWidth={2.2} />
                </div>

                <div className="sq-unique-tag">{f.tag}</div>
                <h3 className="sq-unique-title">{f.title}</h3>
                <p className="sq-unique-card-desc">{f.desc}</p>

                <div className="sq-unique-points">
                  {f.points.map((pt, i) => (
                    <div key={i} className="sq-unique-pt-item">
                      <CheckCircle2 size={14} className="sq-unique-check-icon" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UniqueFeatures;
