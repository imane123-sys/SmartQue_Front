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
      })
      .catch((err) => {
        setErreur(err);
      });
    ticketApi
      .updateStatut(TicketEnAttente[0].id, "EN_COURS")
      .then((res) => {
        setTicketUpdated(res.data);
      })
      .then(() => handleTicketsEtablissement())
      .catch((err) => {
        setErreur(err);
        console.log(erreur);
      });
  };

  return (
    <div>
      {ticketEnCours.map((t) => (
        <div className="now-serving">
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
      ))}
    </div>
  );
}
