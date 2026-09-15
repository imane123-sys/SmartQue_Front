import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import {
  ArrowForward,
  Check,
  Visibility,
  VisibilityOff,
  AutoAwesome,
  Person,
} from "@mui/icons-material";

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

function Logo() {
  return (
    <Link href="/" underline="none" className="logo">
      <Box className="logo-box">SQ</Box>
      <Typography className="logo-text">SmartQueue</Typography>
    </Link>
  );
}

function Login({ onNavigateRegister }) {
  const {login} = useContext(AuthContext);
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

      setSuccessMessage("Connexion réussie !");
      reset();
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          err?.message ||
          "Identifiants invalides ou erreur serveur.",
      );
    }
  };

  return (
    <Box className="login-page register-page">
      <Box className="login-visual">
        <img
          src="/smartqueue-login.png"
          alt="SmartQueue"
          className="login-image"
        />

        <Box className="login-overlay" />

        <Box className="login-visual-content">
          <Logo />

          <Box className="visual-text">
            <Box className="login-kicker">
              <AutoAwesome fontSize="small" />
              Start smarter
            </Box>

            <Typography className="visual-title">
              Make every visit feel considered.
            </Typography>

            <Typography className="visual-description">
              Create your SmartQueue account and bring calmer, clearer waits to
              your team and customers.
            </Typography>
          </Box>

          <Box className="login-visual-footer">
            <Box className="status-card">
              <Box className="check-icon">
                <Check fontSize="small" />
              </Box>

              <Box>
                <Typography className="status-title">
                  Setup takes minutes
                </Typography>

                <Typography className="status-text">
                  One workspace · every queue
                </Typography>
              </Box>
            </Box>

            <Typography className="trusted">
              Built for modern service teams
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="login-form-side">
        <Box className="login-form-wrap register-form-wrap">
          <Box className="mobile-logo">
            <Logo />
          </Box>

          <Box className="login-form-heading">
            <Box className="eyebrow">
              <Person fontSize="small" />
              SIGN IN
            </Box>

            <Typography className="form-title">
              Welcome back<span>.</span>
            </Typography>

            <Typography className="form-description">
              Enter your credentials to access your SmartQueue workspace.
            </Typography>
          </Box>

          {apiError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {apiError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mt: 3 }}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="register-form"
          >
            <TextField
              fullWidth
              label="Email"
              placeholder="alex@company.com"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Mot de passe"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowForward />}
              className="sign-in-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </Box>

          <Typography className="signup-text">
            Vous n'avez pas de compte ?{" "}
            <Link
              href="/register"
              onClick={(e) => {
                if (onNavigateRegister) {
                  e.preventDefault();
                  onNavigateRegister();
                }
              }}
            >
              S'inscrire
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
