import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  Ticket,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { registerClient as registerApi } from "../Api/AuthService";
import "../css/RegisterHope.css";

const registerSchema = yup.object({
  nom: yup
    .string()
    .required("Le nom est obligatoire")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),

  prenom: yup
    .string()
    .required("Le prénom est obligatoire")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),

  email: yup
    .string()
    .required("L'email est obligatoire")
    .email("Le format de l'email est invalide"),

  telephone: yup
    .string()
    .required("Le téléphone est obligatoire")
    .matches(
      /^0[5-7][0-9]{8}$/,
      "Numéro de téléphone invalide (ex: 6 88 44 21 09)",
    ),

  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function RegisterClient() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit: validerFormulaire,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  function handleFullNameChange(e) {
    const [prenom, ...nom] = e.target.value.trim().split(" ");

    setValue("prenom", prenom, { shouldValidate: true });
    setValue("nom", nom.join(" ").trim() || prenom, { shouldValidate: true });
  }

  function formaterTelephone(e) {
    const telephone = e.target.value.replace(/\s+/g, "");
    if (telephone.length === 9 && /^[5-7]/.test(telephone)) {
      e.target.value = "0" + telephone;
    }
    register("telephone").onChange(e);
  }

  async function handleSubmit({ nom, prenom, email, telephone, password }) {
    setApiError(null);
    setSuccess(false);

    try {
      await registerApi({
        nom,
        prenom,
        email,
        telephone,
        password,
        role: "CLIENT",
      });

      setSuccess(true);
      reset();
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setApiError(err.message || "Erreur lors de l'inscription.");
    }
  }

  const nameError = errors.prenom?.message || errors.nom?.message;

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

        <h1 className="sq-reg-title">Create Your Account</h1>
        <p className="sq-reg-subtitle">
          Join over 340,000 users skipping physical lines every day.
        </p>

        {apiError && (
          <div className="sq-reg-alert sq-reg-alert-error">{apiError}</div>
        )}
        {success && (
          <div className="sq-reg-alert sq-reg-alert-success">
            Inscription réussie ! Redirection vers la page de connexion...
          </div>
        )}

        <form
          onSubmit={validerFormulaire(handleSubmit)}
          className="sq-reg-form"
          noValidate
        >
          <div className="sq-reg-field">
            <label className="sq-reg-label">FULL NAME</label>
            <div className={`sq-reg-input-wrap ${nameError ? "error" : ""}`}>
              <User size={16} className="sq-input-icon" />
              <input
                type="text"
                placeholder="Sarah Connor"
                {...register("fullName", { onChange: handleFullNameChange })}
                className="sq-reg-input"
              />
            </div>
            {nameError && <span className="sq-reg-err-msg">{nameError}</span>}
          </div>

          <div className="sq-reg-field">
            <label className="sq-reg-label">EMAIL ADDRESS</label>
            <div className={`sq-reg-input-wrap ${errors.email ? "error" : ""}`}>
              <Mail size={16} className="sq-input-icon" />
              <input
                type="email"
                placeholder="sarah.connor@example.com"
                {...register("email")}
                className="sq-reg-input"
              />
            </div>
            {errors.email && (
              <span className="sq-reg-err-msg">{errors.email.message}</span>
            )}
          </div>

          <div className="sq-reg-field">
            <label className="sq-reg-label">MOBILE PHONE</label>
            <div
              className={`sq-reg-input-wrap ${errors.telephone ? "error" : ""}`}
            >
              <div className="sq-phone-prefix">+212</div>
              <input
                type="tel"
                placeholder="6 88 44 21 09"
                {...register("telephone")}
                onChange={formaterTelephone}
                className="sq-reg-input sq-phone-input"
              />
            </div>
            {errors.telephone && (
              <span className="sq-reg-err-msg">{errors.telephone.message}</span>
            )}
          </div>

          <div className="sq-reg-field">
            <label className="sq-reg-label">CREATE PASSWORD</label>
            <div
              className={`sq-reg-input-wrap ${errors.password ? "error" : ""}`}
            >
              <Lock size={16} className="sq-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••••"
                {...register("password")}
                className="sq-reg-input"
              />
              <button
                type="button"
                className="sq-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="sq-reg-err-msg">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="sq-reg-submit-btn"
          >
            <span>
              {isSubmitting ? "Creating Account..." : "Create Account"}
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
