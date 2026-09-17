import connexion from "./Connexion";

export const notificationApi = {
  getByClient: (idClient, page = 0, size = 10) =>
    connexion.get(
      `/api/notifications/Notifications/tickets/Client/${idClient}`,
      {
        params: {
          page,
          size,
        },
      },
    ),

  getByEtablissement: (idEtablissement, page = 0, size = 10) =>
    connexion.get(
      `/api/notifications/Notifications/tickets/Etablissemnt/${idEtablissement}`,
      {
        params: {
          page,
          size,
        },
      },
    ),

  annulerTicket: (idTicket) =>
    connexion.put(`/api/notifications/annuler-ticket/${idTicket}`),

  notifierTour: (idTicket, idClient) =>
    connexion.post(`/api/notifications/tour/${idTicket}/${idClient}`),

  tourApproche: (idTicket, position, tempsEstime) =>
    connexion.post(`/api/notifications/tour-approche/${idTicket}`, null, {
      params: {
        position,
        tempsEstime,
      },
    }),
};

