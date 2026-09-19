import connexion from "./Connexion";

export const ticketApi = {
  reserve: (data) => connexion.post("/api/tickets/reserve", data),

  getById: (id) => connexion.get(`/api/tickets/${id}`),

  suivre: (id) => connexion.get(`/api/tickets/suivre/${id}`),

  getEnAttente: (statut, nomService) =>
    connexion.get("/api/tickets/attente", {
      params: {
        statut,
        nomService,
      },
    }),

  getPaginatedByEtablissement: (
    id,
    statut = "EN_ATTENTE",
    page = 0,
    size = 10,
  ) =>
    connexion.get(`/api/tickets/ticketPaginated/Statut/etablissement/${id}`, {
      params: {
        statut,
        page,
        size,
      },
    }),

  annuler: (ticketId, clientId) =>
    connexion.put(`/api/tickets/annuler/${ticketId}`, null, {
      params: {
        clientId,
      },
    }),

  appelerSuivant: (serviceId) =>
    connexion.put(`/api/tickets/appeler-suivant/${serviceId}`),

  updateStatut: (ticketId, nouveauStatut) =>
    connexion.put(`/api/tickets/statut/${ticketId}`, null, {
      params: {
        nouveauStatut,
      },
    }),
  getTicketClient: (clientId) =>
    connexion.get(`/api/tickets/client/${clientId}`),

  getHistorique: (idEtablissement) =>
    connexion.get(`/api/tickets/historique/${idEtablissement}`),
};
