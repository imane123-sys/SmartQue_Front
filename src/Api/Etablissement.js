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

  getById: (id) => connexion.get(`/api/etablissements/${id}`),

  getProches: (serviceNom, latitude, longitude) =>
    connexion.get("/api/etablissements/proches", {
      params: {
        serviceNom,
        latitude,
        longitude,
      },
    }),

  create: (data) => connexion.post("/api/etablissements/create", data),

  update: (id, data) => connexion.put(`/api/etablissements/update/${id}`, data),

  delete: (id) =>
    connexion.delete("/api/etablissements/delete", {
      params: {
        id,
      },
    }),
};
