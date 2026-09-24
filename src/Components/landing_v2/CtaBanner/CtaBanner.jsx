import React from "react";
import { LayoutDashboard, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import "./CtaBanner.css";

export const CtaBanner = () => {
  return (
    <section className="sq-cta-section">
      <div className="sq-container">
        <div className="sq-cta-banner">
          
          <div className="sq-cta-content">
            <div className="sq-cta-pill">REJOIGNEZ LA NOUVELLE EXPÉRIENCE</div>
            <h2 className="sq-cta-title">
              Prêt à moderniser votre façon d'attendre ?
            </h2>
            <p className="sq-cta-subtitle">
              Créez votre compte en moins de 2 minutes et prenez votre premier
              ticket dès maintenant.
            </p>
          </div>

          
          <div className="sq-cta-actions">
            <Link to="/register" className="sq-cta-btn-white">
              <UserPlus size={16} strokeWidth={2.2} />
              <span>Créer un compte gratuit</span>
            </Link>
            <Link to="/login" className="sq-cta-btn-translucent">
              <LayoutDashboard size={16} strokeWidth={2.2} />
              <span>Espace Connexion</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
