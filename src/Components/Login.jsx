import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  Ticket,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { AuthContext } from "./AuthContext";
import "../css/RegisterClient.css";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email("Le format de l'email est invalide"),

  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

function Login({ onNavigateRegister }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      const response = await login(data);

      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      setSuccessMessage("Connexion réussie ! Redirection en cours...");
      reset();
      setTimeout(() => {
        navigate("/Etablissement-service");
      }, 700);
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          err?.message ||
          "Identifiants invalides ou erreur serveur.",
      );
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
          <span className="sq-reg-kicker-text">ESPACE CONNEXION</span>
        </div>

        <h1 className="sq-reg-title">Bienvenue</h1>
        <p className="sq-reg-subtitle">
          Connectez-vous à votre espace SmartQueue.
        </p>

        {apiError && (
          <div className="sq-reg-alert sq-reg-alert-error">{apiError}</div>
        )}
        {successMessage && (
          <div className="sq-reg-alert sq-reg-alert-success">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="sq-reg-form">
          <div className="sq-reg-field">
            <label htmlFor="login-email" className="sq-reg-label">
              Email
            </label>
            <div className={`sq-reg-input-wrap ${errors.email ? "error" : ""}`}>
              <Mail size={16} className="sq-input-icon" />
              <input
                id="login-email"
                type="email"
                placeholder="alex@company.com"
                {...register("email")}
                className="sq-reg-input"
              />
            </div>
            {errors.email && (
              <span className="sq-reg-err-msg">{errors.email.message}</span>
            )}
          </div>

          <div className="sq-reg-field">
            <label htmlFor="login-password" className="sq-reg-label">
              Mot de passe
            </label>
            <div
              className={`sq-reg-input-wrap ${errors.password ? "error" : ""}`}
            >
              <Lock size={16} className="sq-input-icon" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••••"
                {...register("password")}
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
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </span>
            <ArrowRight size={16} strokeWidth={2.4} />
          </button>
        </form>

        <p className="sq-reg-login-hint">
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/register"
            className="sq-reg-login-link"
            onClick={(e) => {
              if (onNavigateRegister) {
                e.preventDefault();
                onNavigateRegister();
              }
            }}
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
