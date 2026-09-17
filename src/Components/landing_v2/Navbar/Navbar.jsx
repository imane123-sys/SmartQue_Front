import React, { useState } from "react";
import { Ticket, ChevronRight, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sq-navbar-header">
      <div className="sq-container sq-navbar-container">
        
        <a href="#hero" className="sq-logo-link">
          <div className="sq-logo-icon">
            <Ticket size={20} strokeWidth={2.2} />
          </div>
          <div className="sq-logo-text">
            <span className="sq-logo-brand">
              Smart<span>Queue</span>
            </span>
            <span className="sq-logo-sub">Votre temps a de la valeur</span>
          </div>
        </a>

        
        <nav className="sq-nav-links">
          <a href="#hero" className="sq-nav-link active">
            Accueil
          </a>
          <a href="#recherche" className="sq-nav-link">
            Trouver un établissement
          </a>
          <a href="#comment-ca-marche" className="sq-nav-link">
            Comment ça marche ?
          </a>
          <a href="#etablissements" className="sq-nav-link">
            Pour les établissements
          </a>
        </nav>

        
        <div className="sq-navbar-actions">
          <Link to="/login" className="sq-signin-link">
            Se connecter
          </Link>
          <Link to="/register" className="sq-btn-primary">
            <span>Prendre un ticket</span>
            <ChevronRight size={15} strokeWidth={2.5} />
          </Link>

          
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sq-mobile-toggle"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      <div className={`sq-mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <a
          href="#hero"
          onClick={() => setMobileOpen(false)}
          className="sq-nav-link active"
        >
          Accueil
        </a>
        <a
          href="#recherche"
          onClick={() => setMobileOpen(false)}
          className="sq-nav-link"
        >
          Trouver un établissement
        </a>
        <a
          href="#comment-ca-marche"
          onClick={() => setMobileOpen(false)}
          className="sq-nav-link"
        >
          Comment ça marche ?
        </a>
        <a
          href="#etablissements"
          onClick={() => setMobileOpen(false)}
          className="sq-nav-link"
        >
          Pour les établissements
        </a>
        <Link
          to="/login"
          onClick={() => setMobileOpen(false)}
          className="sq-signin-link"
          style={{ padding: "8px 0" }}
        >
          Se connecter
        </Link>
        <Link
          to="/register"
          onClick={() => setMobileOpen(false)}
          className="sq-btn-primary"
          style={{ justifyContent: "center", width: "100%" }}
        >
          <span>Prendre un ticket</span>
          <ChevronRight size={15} strokeWidth={2.5} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
