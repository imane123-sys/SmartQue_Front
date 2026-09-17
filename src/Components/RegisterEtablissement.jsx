import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Ticket,
  ArrowLeft,
  Building2,
  MapPin,
  Tag,
  Clock,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { registerEtablissement } from "../Api/AuthService";
import "../css/RegisterHope.css";

export default function RegisterEtablissement() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    data.horaireOuverture = data.horaireOuverture.slice(0, 5);
    data.horaireFermeture = data.horaireFermeture.slice(0, 5);
    setError("");
    setStatus("loading");
    try {
      await registerEtablissement(data);
      form.reset();
      setStatus("success");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription.");
      setStatus("");
    }
  }

  return (
    <div className="sq-reg-page">
      <div className="sq-reg-container">
        <header className="sq-reg-header">
          <Link to="/" className="sq-reg-logo">
            <div className="sq-reg-logo-icon">
              <Ticket size={21} strokeWidth={2.4} />
            </div>
            <span className="sq-reg-logo-brand">SmartQueue</span>
          </Link>
          <Link to="/" className="sq-reg-back">
            <ArrowLeft size={15} strokeWidth={2.4} />
            <span>Back to Home</span>
          </Link>
        </header>

        <div className="sq-reg-kicker">
          <span className="sq-reg-kicker-dash"></span>
          <span className="sq-reg-kicker-text">GET STARTED FREE</span>
        </div>
        <h1 className="sq-reg-title">Register Your Business</h1>
        <p className="sq-reg-subtitle">
          Create your account and start managing your queues.
        </p>

        {error && (
          <div role="alert" className="sq-reg-alert sq-reg-alert-error">
            {error}
          </div>
        )}
        {status === "success" && (
          <div role="status" className="sq-reg-alert sq-reg-alert-success">
            Inscription réussie ! Redirection vers la page de connexion...
          </div>
        )}

        <form onSubmit={handleSubmit} className="sq-reg-form">
          <div className="sq-reg-field">
            <label htmlFor="email" className="sq-reg-label">
              EMAIL ADDRESS
            </label>
            <div className="sq-reg-input-wrap">
              <Mail size={16} className="sq-input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="contact@example.com"
                className="sq-reg-input"
              />
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="password" className="sq-reg-label">
              CREATE PASSWORD
            </label>
            <div className="sq-reg-input-wrap">
              <Lock size={16} className="sq-input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••••••"
                className="sq-reg-input"
              />
              <button
                type="button"
                className="sq-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="nom" className="sq-reg-label">
              BUSINESS NAME
            </label>
            <div className="sq-reg-input-wrap">
              <Building2 size={16} className="sq-input-icon" />
              <input
                id="nom"
                name="nom"
                type="text"
                required
                pattern=".*\S.*"
                placeholder="Business name"
                className="sq-reg-input"
              />
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="adresse" className="sq-reg-label">
              ADDRESS
            </label>
            <div className="sq-reg-input-wrap">
              <MapPin size={16} className="sq-input-icon" />
              <input
                id="adresse"
                name="adresse"
                type="text"
                required
                pattern=".*\S.*"
                placeholder="Street, city"
                className="sq-reg-input"
              />
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="telephone" className="sq-reg-label">
              PHONE NUMBER
            </label>
            <div className="sq-reg-input-wrap">
              <div className="sq-phone-prefix">+212</div>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                required
                pattern=".*\S.*"
                placeholder="0612345678"
                className="sq-reg-input sq-phone-input"
              />
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="type" className="sq-reg-label">
              BUSINESS TYPE
            </label>
            <div className="sq-reg-input-wrap">
              <Tag size={16} className="sq-input-icon" />
              <input
                id="type"
                name="type"
                type="text"
                required
                pattern=".*\S.*"
                placeholder="Business type"
                className="sq-reg-input"
              />
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="horaireOuverture" className="sq-reg-label">
              OPENING TIME
            </label>
            <div className="sq-reg-input-wrap">
              <Clock size={16} className="sq-input-icon" />
              <input
                id="horaireOuverture"
                name="horaireOuverture"
                type="time"
                step="60"
                required
                className="sq-reg-input"
              />
            </div>
          </div>

          <div className="sq-reg-field">
            <label htmlFor="horaireFermeture" className="sq-reg-label">
              CLOSING TIME
            </label>
            <div className="sq-reg-input-wrap">
              <Clock size={16} className="sq-input-icon" />
              <input
                id="horaireFermeture"
                name="horaireFermeture"
                type="time"
                step="60"
                required
                className="sq-reg-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="sq-reg-submit-btn"
          >
            <span>
              {status === "loading" ? "Creating Account..." : "Create Account"}
            </span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </button>
        </form>

        <p className="sq-reg-login-hint">
          Already have an account?{" "}
          <Link to="/login" className="sq-reg-login-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
