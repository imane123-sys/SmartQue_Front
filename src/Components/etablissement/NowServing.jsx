import React, { useState } from "react";
import { Check } from "lucide-react";
import { useEtablissement } from "./EtablissementContext";
import { ticketApi } from "../../Api/Ticket";

export default function NowServing() {
  const { ticketEnCours, TicketEnAttente, handleTicketsEtablissement } =
    useEtablissement();
  const [ticketUpdated, setTicketUpdated] = useState({});
  const [erreur, setErreur] = useState("");

  const handleModifyStatutCallNext = (idTicket) => {
    ticketApi
      .updateStatut(idTicket, "TERMINE")
      .then((res) => {
        setTicketUpdated(res.data);

        if (TicketEnAttente && TicketEnAttente.length > 0) {
          return ticketApi.updateStatut(TicketEnAttente[0].id, "EN_COURS");
        }
        return Promise.resolve(null);
      })
      .then(() => {
        return handleTicketsEtablissement();
      })
      .catch((err) => {
        setErreur(err?.message || "Erreur");
        console.log(err);
      });
  };

  const handleCallNext = () => {
    if (!TicketEnAttente || TicketEnAttente.length === 0) return;
    const nextTicket = TicketEnAttente[0];
    ticketApi
      .updateStatut(nextTicket.id, "EN_COURS")
      .then((res) => {
        setTicketUpdated(res.data);
        return handleTicketsEtablissement();
      })
      .catch((err) => {
        setErreur(err?.message || "Erreur");
        console.log(err);
      });
  };

  const hasTicketEnCours = Array.isArray(ticketEnCours) && ticketEnCours.length > 0;
  const nextWaitingTicket =
    Array.isArray(TicketEnAttente) && TicketEnAttente.length > 0
      ? TicketEnAttente[0]
      : null;

  return (
    <div>
      {hasTicketEnCours ? (
        ticketEnCours.map((t) => (
          <div className="now-serving" key={t.id}>
            <div className="serving-left">
              <div className="ticket-badge">
                <span>Ticket</span>
                <strong>{t.numero}</strong>
              </div>

              <div>
                <div className="serving-title">
                  <span>statut de ticket</span>
                  <i></i>
                  <strong>{t.statut}</strong>
                </div>

                <p>{t.nomService}</p>
              </div>
            </div>

            <div className="serving-right">
              <div className="elapsed">
                <span>Temps Estimé</span>
                <strong>{t.tempsEstime} min</strong>
              </div>

              <button
                className="primary-button"
                onClick={() => handleModifyStatutCallNext(t.id)}
              >
                <Check size={14} />
                Compléter & Appeler Suivant
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="now-serving">
          <div className="serving-left">
            <div className="ticket-badge">
              <span>Ticket</span>
              <strong>{nextWaitingTicket?.numero || "--"}</strong>
            </div>

            <div>
              <div className="serving-title">
                <span>statut de ticket</span>
                <i></i>
                <strong>
                  {nextWaitingTicket ? "EN ATTENTE" : "AUCUN TICKET"}
                </strong>
              </div>

              <p>
                {nextWaitingTicket
                  ? nextWaitingTicket.nomService
                  : "Aucun ticket en attente d'appel"}
              </p>
            </div>
          </div>

          <div className="serving-right">
            <div className="elapsed">
              <span>Temps Estimé</span>
              <strong>
                {nextWaitingTicket?.tempsEstime
                  ? `${nextWaitingTicket.tempsEstime} min`
                  : "--"}
              </strong>
            </div>

            <button
              className="primary-button"
              onClick={handleCallNext}
              disabled={!nextWaitingTicket}
              style={
                !nextWaitingTicket
                  ? { opacity: 0.6, cursor: "not-allowed" }
                  : {}
              }
            >
              <Check size={14} />
              Appeler Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
