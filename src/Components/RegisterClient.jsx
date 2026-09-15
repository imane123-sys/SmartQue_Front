import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import {
  ArrowForward,
  Visibility,
  VisibilityOff,
  PersonAdd,
} from "@mui/icons-material";

import { registerClient as registerApi } from "../Api/AuthService";

import "../css/RegisterClient.css";

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
    .matches(/^0[5-7][0-9]{8}$/, "Numéro de téléphone invalide"),

  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),

  role: yup
    .string()
    .required("Le rôle est obligatoire")
    .oneOf(["ADMIN", "ETABLISSEMENT", "CLIENT"], "Rôle invalide"),
});

function Logo() {
  return (
    <Link href="/" underline="none" className="logo">
      <Box className="logo-box">SQ</Box>

      <Typography className="logo-text">SmartQueue</Typography>
    </Link>
  );
}

function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),

    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      password: "",
      role: "CLIENT",
    },
  });

  const onSubmit = async (data) => {
    if (!accepted) {
      return;
    }

    setApiError(null);
    setSuccessMessage(null);

    try {
      await registerApi(data);

      setSuccessMessage("Inscription réussie !");

      reset();

      setAccepted(false);
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de l'inscription.",
      );
    }
  };

  return (
    <Box
      className="login-page register-page"
      sx={{
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        className="login-visual"
        sx={{
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          padding: { xs: "24px", md: "32px 44px" },
        }}
      >
        <img
          src="/register_picture.jpg?v=3"
          alt="SmartQueue"
          className="login-image"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
        />

        <Box className="login-visual-content">
          <Logo />

          <Box className="visual-text">
            <Typography
              className="visual-title"
              sx={{ fontSize: "32px !important", lineHeight: "1.2 !important" }}
            >
              Make every visit feel considered.
            </Typography>

            <Typography
              className="visual-description"
              sx={{ fontSize: "13.5px !important" }}
            >
              Create your SmartQueue account and bring calmer, clearer waits to
              your team and customers.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        className="login-form-side"
        sx={{
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          padding: { xs: "16px 20px", md: "20px 40px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className="login-form-wrap register-form-wrap"
          sx={{ maxWidth: "420px", width: "100%" }}
        >
          <Box className="mobile-logo">
            <Logo />
          </Box>

          <Box className="login-form-heading" sx={{ mb: 1 }}>
            <Box className="eyebrow" sx={{ mb: 0.5, fontSize: "11px" }}>
              <PersonAdd sx={{ fontSize: "16px !important" }} />
              Create account
            </Box>

            <Typography
              className="form-title"
              sx={{
                fontSize: "26px !important",
                mb: "2px !important",
                lineHeight: "1.15 !important",
              }}
            >
              Join SmartQueue<span>.</span>
            </Typography>

            <Typography
              className="form-description"
              sx={{ mb: "10px !important", fontSize: "13px !important" }}
            >
              Set up your profile to start managing queues with ease.
            </Typography>
          </Box>

          {apiError && (
            <Alert severity="error" sx={{ mt: 1, mb: 1, py: 0.25 }}>
              {apiError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mt: 1, mb: 1, py: 0.25 }}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="register-form"
            sx={{
              gap: "8px !important",
              "& .MuiInputLabel-root": {
                fontSize: "12px !important",
                mb: "2px !important",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-input": {
                padding: "7px 12px !important",
                fontSize: "13px !important",
              },
              "& .register-name-grid, & .register-form-grid": {
                gap: "8px !important",
              },
            }}
          >
            <Box className="register-name-grid">
              <TextField
                fullWidth
                size="small"
                label="Nom"
                placeholder="Ramadane"
                {...register("nom")}
                error={!!errors.nom}
                helperText={errors.nom?.message}
              />

              <TextField
                fullWidth
                size="small"
                label="Prénom"
                placeholder="Imane"
                {...register("prenom")}
                error={!!errors.prenom}
                helperText={errors.prenom?.message}
              />
            </Box>

            <Box className="register-form-grid">
              <TextField
                fullWidth
                size="small"
                label="Email"
                placeholder="ramadane@gmail.com"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                size="small"
                label="Téléphone"
                placeholder="0612345678"
                type="tel"
                {...register("telephone")}
                error={!!errors.telephone}
                helperText={errors.telephone?.message}
              />
            </Box>

            <TextField
              fullWidth
              size="small"
              label="Mot de passe"
              placeholder="Créer un mot de passe"
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
                      size="small"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <input type="hidden" value="CLIENT" {...register("role")} />

            <FormControlLabel
              sx={{
                my: "1px !important",
                "& .terms-label": { fontSize: "11px !important", lineHeight: "1.3 !important" },
              }}
              control={
                <Checkbox
                  size="small"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  sx={{ p: "4px !important" }}
                />
              }
              label={
                <Typography className="terms-label">
                  J'accepte les conditions d'utilisation et la politique de
                  confidentialité.
                </Typography>
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowForward />}
              className="sign-in-button"
              disabled={isSubmitting || !accepted}
              sx={{
                height: "38px !important",
                mt: "4px !important",
                fontSize: "13.5px !important",
              }}
            >
              {isSubmitting ? "Inscription..." : "Créer mon compte"}
            </Button>
          </Box>

          <Typography
            className="signup-text"
            sx={{ mt: "10px !important", fontSize: "12.5px !important" }}
          >
            Vous avez déjà un compte ? <Link href="/login">Se connecter</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterClient;
