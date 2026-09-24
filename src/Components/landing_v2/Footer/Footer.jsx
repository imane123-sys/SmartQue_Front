import React, { useState } from "react";
import { Mail, Shield, FileText, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="sq-footer">
      <div className="sq-container">
        <div className="sq-footer-grid">
          
          <div className="sq-footer-col sq-footer-brand">
            <div className="sq-footer-logo">
              <div className="sq-footer-logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="#0084ff" />
                  <path
                    d="M7 8.5C7 7.67157 7.67157 7 8.5 7H15.5C16.3284 7 17 7.67157 17 8.5V9.5C16.1716 9.5 15.5 10.1716 15.5 11C15.5 11.8284 16.1716 12.5 17 12.5V15.5C17 16.3284 16.3284 17 15.5 17H8.5C7.67157 17 7 16.3284 7 15.5V12.5C7.82843 12.5 8.5 11.8284 8.5 11C8.5 10.1716 7.82843 9.5 7 9.5V8.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="sq-footer-logo-text">
                <span className="sq-brand-bold">Smart</span>Queue
              </span>
            </div>

            <p className="sq-footer-slogan">« Votre temps a de la valeur »</p>

            <p className="sq-footer-desc">
              La plateforme intelligente de file d'attente virtuelle en temps
              réel. Nous éliminons l'attente physique pour les usagers et
              fluidifions l'accueil des établissements.
            </p>

            <p className="sq-footer-copyright">
              © {new Date().getFullYear()} SmartQueue. Tous droits réservés.
            </p>
          </div>

          
          <div className="sq-footer-col">
            <h4 className="sq-footer-title">LIENS RAPIDES</h4>
            <ul className="sq-footer-links">
              <li>
                <a href="#recherche">Services & Établissements</a>
              </li>
              <li>
                <a href="#comment-ca-marche">Comment ça marche ?</a>
              </li>
              <li>
                <Link to="/login">Connexion Client</Link>
              </li>
              <li>
                <Link to="/login">Connexion Établissement</Link>
              </li>
              <li>
                <a
                  href="/swagger-ui/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="sq-footer-badge-link"
                ></a>
              </li>
            </ul>
          </div>

          
          <div className="sq-footer-col">
            <h4 className="sq-footer-title">LÉGAL & SÉCURITÉ</h4>
            <ul className="sq-footer-links">
              <li>
                <a href="#confidentialite">
                  Politique de confidentialité (RGPD)
                </a>
              </li>
              <li>
                <a href="#cgu">Conditions Générales (CGU)</a>
              </li>
              <li>
                <a href="#mentions">Mentions Légales</a>
              </li>
              <li>
                <a href="#securite">Sécurité des QR Codes</a>
              </li>
            </ul>
          </div>

          
          <div className="sq-footer-col" id="contact">
            <h4 className="sq-footer-title">CONTACT & SUPPORT</h4>
            <p className="sq-footer-desc" style={{ marginBottom: "12px" }}>
              Besoin d'aide ou d'intégrer vos guichets ?
            </p>
            <p className="sq-footer-email-link">
              <Mail size={13} />
              <span>contact@smartqueue.fr</span>
            </p>

            {subscribed ? (
              <div className="sq-footer-subscribed">
                ✓ Merci pour votre inscription !
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="sq-footer-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="sq-footer-input"
                  required
                />
                <button type="submit" className="sq-footer-btn">
                  Rejoindre
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
