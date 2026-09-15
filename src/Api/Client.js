import connexion from "../Api/Connexion";

export const clientApi = {
  create: (data) => connexion.post("/api/clients/create", data),

  getById: (id) => connexion.get(`/api/clients/${id}`),

  getByEmail: (email) =>
    connexion.get("/api/clients/client", {
      params: { email },
    }),

  getAll: (page = 0, size = 10) =>
    connexion.get("/api/clients", {
      params: {
        page,
        size,
        sort: "nom,asc",
      },
    }),

  update: (id, data) => connexion.put(`/api/clients/update/${id}`, data),

  delete: (id) => connexion.delete(`/api/clients/delete/${id}`),
};
