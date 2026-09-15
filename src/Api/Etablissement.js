import connexion from "./Connexion";

export const etablissementApi = {
  getAll: (page = 0, size = 10) =>
    connexion.get("/api/etablissements", {
      params: {
        page,
        size,
        sort: "nom,asc",
      },
    }),

  getById: (id) =>
    connexion.get(`/api/etablissements/${id}`),

  // Trouver les établissements proches par service
  getProches: (serviceNom, latitude, longitude, rayonKm = 10) =>
    connexion.get("/api/etablissements/proches", {
      params: {
        serviceNom,
        latitude,
        longitude,
        rayonKm,
      },
    }),

  // Créer un établissement
  create: (data) =>
    connexion.post("/api/etablissements/create", data),

  // Modifier un établissement
  update: (id, data) =>
    connexion.put(`/api/etablissements/update/${id}`, data),

  // Supprimer un établissement
  delete: (id) =>
    connexion.delete("/api/etablissements/delete", {
      params: {
        id,
      },
    }),
};