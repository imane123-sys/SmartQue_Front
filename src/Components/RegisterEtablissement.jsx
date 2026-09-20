import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const schema = yup.object({
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est obligatoire"),

  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est obligatoire"),

  nom: yup.string().trim().required("Le nom est obligatoire"),

  adresse: yup.string().trim().required("L'adresse est obligatoire"),

  telephone: yup
    .string()
    .trim()
    .required("Le numéro de téléphone est obligatoire"),

  type: yup.string().trim().required("Le type est obligatoire"),

  horaireOuverture: yup
    .string()
    .required("L'heure d'ouverture est obligatoire"),

  horaireFermeture: yup
    .string()
    .required("L'heure de fermeture est obligatoire"),
});

export default function RegisterEtablissement() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (status === "loading" || status === "success") return;

    setStatus("loading");

    try {
      data.horaireOuverture = data.horaireOuverture.slice(0, 5);
      data.horaireFermeture = data.horaireFermeture.slice(0, 5);

      await registerEtablissement(data);

      reset();
      setStatus("success");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setStatus("");
    }
  };

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

        {status === "success" && (
          <div className="sq-reg-alert sq-reg-alert-success">
            Inscription réussie ! Redirection vers la page de connexion...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="sq-reg-form">
          
          <div className="sq-reg-field">
            <label className="sq-reg-label">EMAIL ADDRESS</label>

            <div className="sq-reg-input-wrap">
              <Mail size={16} className="sq-input-icon" />

              <input
                type="email"
                placeholder="contact@example.com"
                className="sq-reg-input"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <small className="sq-reg-error">{errors.email.message}</small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">CREATE PASSWORD</label>

            <div className="sq-reg-input-wrap">
              <Lock size={16} className="sq-input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••••"
                className="sq-reg-input"
                {...register("password")}
              />

              <button
                type="button"
                className="sq-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password && (
              <small className="sq-reg-error">{errors.password.message}</small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">BUSINESS NAME</label>

            <div className="sq-reg-input-wrap">
              <Building2 size={16} className="sq-input-icon" />

              <input
                type="text"
                placeholder="Business name"
                className="sq-reg-input"
                {...register("nom")}
              />
            </div>

            {errors.nom && (
              <small className="sq-reg-error">{errors.nom.message}</small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">ADDRESS</label>

            <div className="sq-reg-input-wrap">
              <MapPin size={16} className="sq-input-icon" />

              <input
                type="text"
                placeholder="Street, city"
                className="sq-reg-input"
                {...register("adresse")}
              />
            </div>

            {errors.adresse && (
              <small className="sq-reg-error">{errors.adresse.message}</small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">PHONE NUMBER</label>

            <div className="sq-reg-input-wrap">
              <div className="sq-phone-prefix">+212</div>

              <input
                type="tel"
                placeholder="0612345678"
                className="sq-reg-input sq-phone-input"
                {...register("telephone")}
              />
            </div>

            {errors.telephone && (
              <small className="sq-reg-error">{errors.telephone.message}</small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">BUSINESS TYPE</label>

            <div className="sq-reg-input-wrap">
              <Tag size={16} className="sq-input-icon" />

              <input
                type="text"
                placeholder="Business type"
                className="sq-reg-input"
                {...register("type")}
              />
            </div>

            {errors.type && (
              <small className="sq-reg-error">{errors.type.message}</small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">OPENING TIME</label>

            <div className="sq-reg-input-wrap">
              <Clock size={16} className="sq-input-icon" />

              <input
                type="time"
                step="60"
                className="sq-reg-input"
                {...register("horaireOuverture")}
              />
            </div>

            {errors.horaireOuverture && (
              <small className="sq-reg-error">
                {errors.horaireOuverture.message}
              </small>
            )}
          </div>

          
          <div className="sq-reg-field">
            <label className="sq-reg-label">CLOSING TIME</label>

            <div className="sq-reg-input-wrap">
              <Clock size={16} className="sq-input-icon" />

              <input
                type="time"
                step="60"
                className="sq-reg-input"
                {...register("horaireFermeture")}
              />
            </div>

            {errors.horaireFermeture && (
              <small className="sq-reg-error">
                {errors.horaireFermeture.message}
              </small>
            )}
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
