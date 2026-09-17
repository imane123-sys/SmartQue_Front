import connexion from "./Connexion";

export const serviceApi = {
  getAll: () =>
    connexion.get("/api/services"),

  getByEtablissement: (id) =>
    connexion.get("/api/services/etablissement", {
      params: {
        id,
      },
    }),

  exists: (nom, id) =>
    connexion.get("/api/services/exists", {
      params: {
        nom,
        id,
      },
    }),

  create: (data) =>
    connexion.post("/api/services/create", data),

  update: (id, data) =>
    connexion.put("/api/services/update", data, {
      params: {
        id,
      },
    }),

  delete: (id) =>
    connexion.delete("/api/services/delete", {
      params: {
        id,
      },
    }),
};