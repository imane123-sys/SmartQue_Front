import axios from "axios";

const connexion = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

connexion.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

connexion.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let status = error.response?.status;
    let message = error.response?.data?.message || "Une erreur est survenue";

    if (error.response) {
      switch (status) {
        case 400:
          console.log("[400 Bad Request]:", message);
          break;
        case 401:
          console.warn(
            "[401 Unauthorized]: Session expirée. Nettoyage et redirection...",
          );
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 403:
          console.error("[403 Forbidden]: Accès refusé à cette ressource.");
          message = "Vous n'avez pas les permissions nécessaires.";
          break;
        case 404:
          console.error("[404 Not Found]: Ressource introuvable.");
          message = "La ressource demandée n'existe pas.";
          break;
        case 500:
          console.error(
            "[500 Internal Server Error]: Erreur du serveur HealthCare+.",
          );
          message = "Erreur interne du serveur. Veuillez réessayer plus tard.";
          break;
        default:
          console.error(`[Erreur ${status}]:`, message);
      }
    } else if (error.request) {
      status = 0;
      console.error(
        "[Network Error]: Impossible de joindre le serveur backend.",
      );
      message = "Impossible de contacter le serveur. Vérifiez votre connexion.";
    } else {
      status = null;
      console.error("[Axios Error]:", error.message);
    }

    return Promise.reject({ status, message });
  },
);

export default connexion;
