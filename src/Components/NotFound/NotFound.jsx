import React from "react";
import { useNavigate } from "react-router-dom"; // Si vous utilisez React Router
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="error-code">
          <span className="digit four-first">4</span>
          <span className="digit zero">0</span>
          <span className="digit four-second">4</span>
        </div>

        <h1 className="error-title">Désolé, page introuvable...</h1>
        <p className="error-description">
          Nous avons tenté de la retrouver, mais il semble qu'elle ait manqué
          son entrée. Il est possible que le lien soit obsolète ou que la page
          ait été retirée. Retournez à la page d'accueil pour continuer votre
          navigation.
        </p>

        <button className="back-home-btn" onClick={handleGoHome}>
          <span className="btn-arrow">←</span> Retour à l'accueil
        </button>

        <svg
          className="wave-lines"
          viewBox="0 0 1000 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,150 C200,120 400,280 600,220 C800,160 900,290 1000,180"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          <path
            d="M0,160 C250,140 450,260 650,200 C850,140 920,270 1000,220"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1"
          />
          <path
            d="M0,140 C180,110 380,290 580,240 C780,190 880,310 1000,140"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
          <path
            d="M0,155 C300,130 500,270 700,210 C900,150 950,260 1000,250"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          <path
            d="M100,170 C350,190 550,290 750,230 C900,180 970,240 1000,210"
            stroke="rgba(0,0,0,0.07)"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
