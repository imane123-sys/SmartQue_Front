import React from "react";
import { ChevronRight, ArrowRight, CheckCircle2, QrCode, Clock, BellRing, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

export const Hero = () => {
  return (
    <section id="hero" className="sq-hero-section">
      <div className="sq-container sq-hero-grid">
        
        <div className="sq-hero-left">
          
          <div className="sq-pretitle-wrapper">
            <span className="sq-pretitle-line"></span>
            <span className="sq-pretitle-text">La Révolution de la File d'Attente Virtuelle</span>
          </div>

          
          <h1 className="sq-hero-headline">
            Ne perdez plus votre temps <br />
            dans les <span className="sq-highlight">files d'attente</span>.
          </h1>

          
          <p className="sq-hero-subtitle">
            Prenez votre ticket à distance, suivez votre position en temps réel depuis votre
            smartphone et ne venez que lorsque c'est votre tour.
          </p>

          
          <div className="sq-hero-cta-group">
            <Link to="/register" className="sq-hero-btn-primary">
              <span>Réserver un ticket en ligne</span>
              <ChevronRight size={16} strokeWidth={2.5} />
            </Link>
            <Link to="/register" className="sq-hero-btn-secondary">
              <span>Vous êtes un établissement ? Rejoignez-nous</span>
              <ArrowRight size={15} strokeWidth={2.2} />
            </Link>
          </div>

          
          <div className="sq-micro-proofs">
            <div className="sq-micro-proof-item">
              <CheckCircle2 size={15} className="sq-micro-proof-icon" />
              <span>e-Ticket avec QR Code instantané</span>
            </div>
            <div className="sq-micro-proof-item">
              <CheckCircle2 size={15} className="sq-micro-proof-icon" />
              <span>Alertes SMS & notifications d'approche</span>
            </div>
            <div className="sq-micro-proof-item">
              <CheckCircle2 size={15} className="sq-micro-proof-icon" />
              <span>Aucune application à installer</span>
            </div>
          </div>
        </div>

        
        <div className="sq-hero-right">
          <div className="sq-hero-showcase">
            
            <div className="sq-showcase-woman-box">
              <img
                src="/hero-woman-transparent.png"
                alt="Professionnelle SmartQueue en tailleur bleu présentant l'application"
                className="sq-showcase-woman-img"
              />
            </div>

            
            <div className="sq-showcase-stack">
              
              <div className="sq-showcase-top-badge">
                <div className="sq-showcase-crown">👑</div>
                <div className="sq-brush-pill sq-brush-blue">Réservez</div>
                <div className="sq-brush-pill sq-brush-amber">Suivez</div>
                <div className="sq-brush-pill sq-brush-navy">Passez</div>
                <div className="sq-brush-script">Zéro Attente ♡</div>
              </div>

              
              <div className="sq-showcase-pills-list">
                
                <div className="sq-feature-pill sq-pill-blue">
                  <div className="sq-pill-icon-circle sq-picon-blue">
                    <QrCode size={17} strokeWidth={2.4} />
                  </div>
                  <div className="sq-pill-text">
                    <div className="sq-pill-title">e-Ticket QR Code</div>
                    <div className="sq-pill-desc">Réservation en 1 clic</div>
                  </div>
                </div>

                
                <div className="sq-feature-pill sq-pill-magenta">
                  <div className="sq-pill-icon-circle sq-picon-magenta">
                    <Clock size={17} strokeWidth={2.4} />
                  </div>
                  <div className="sq-pill-text">
                    <div className="sq-pill-title">Suivi en Temps Réel</div>
                    <div className="sq-pill-desc">Position & temps estimé</div>
                  </div>
                </div>

                
                <div className="sq-feature-pill sq-pill-amber">
                  <div className="sq-pill-icon-circle sq-picon-amber">
                    <BellRing size={17} strokeWidth={2.4} />
                  </div>
                  <div className="sq-pill-text">
                    <div className="sq-pill-title">Alertes SMS & Push</div>
                    <div className="sq-pill-desc">Votre tour approche</div>
                  </div>
                </div>

                
                <div className="sq-feature-pill sq-pill-teal">
                  <div className="sq-pill-icon-circle sq-picon-teal">
                    <Navigation size={17} strokeWidth={2.4} />
                  </div>
                  <div className="sq-pill-text">
                    <div className="sq-pill-title">Guichet Géolocalisé</div>
                    <div className="sq-pill-desc">Rayon 5, 10, 20 km</div>
                  </div>
                </div>
              </div>

              
              <div className="sq-showcase-signature">
                <span className="sq-sig-main">Votre Temps</span>
                <span className="sq-sig-script">a de la Valeur ♡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
