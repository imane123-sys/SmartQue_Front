import connexion from "./Connexion";

export const notificationApi = {
  getNotificationsClient: (idClient, page = 0, size = 10) =>
    connexion.get(`/api/notifications/client/${idClient}`, {
      params: {
        page,
        size,
      },
    }),
  getByClient: (idClient, page = 0, size = 10) =>
    connexion.get(`/api/notifications/client/${idClient}`, {
      params: {
        page,
        size,
      },
    }),

  getNotificationsEtablissement: (idEtablissement, page = 0, size = 10) =>
    connexion.get(`/api/notifications/etablissement/${idEtablissement}`, {
      params: {
        page,
        size,
      },
    }),
  getByEtablissement: (idEtablissement, page = 0, size = 10) =>
    connexion.get(`/api/notifications/etablissement/${idEtablissement}`, {
      params: {
        page,
        size,
      },
    }),

  // Envoyer une notification de confirmation de ticket
  notificationConfirmation: (idTicket) =>
    connexion.post(`/api/notifications/confirmation/${idTicket}`),

  notificationUrTurn: (idTicket, idClient) =>
    connexion.post(`/api/notifications/tour/${idTicket}/${idClient}`),
  notifierTour: (idTicket, idClient) =>
    connexion.post(`/api/notifications/tour/${idTicket}/${idClient}`),

  sendTurnApproachingNotification: (idTicket, position, tempsEstime) =>
    connexion.post(`/api/notifications/tour-approche/${idTicket}`, null, {
      params: {
        position,
        tempsEstime,
      },
    }),
  tourApproche: (idTicket, position, tempsEstime) =>
    connexion.post(`/api/notifications/tour-approche/${idTicket}`, null, {
      params: {
        position,
        tempsEstime,
      },
    }),

  notificationAnnulationTicket: (idTicket) =>
    connexion.put(`/api/notifications/annuler-ticket/${idTicket}`),
  annulerTicket: (idTicket) =>
    connexion.put(`/api/notifications/annuler-ticket/${idTicket}`),
};
