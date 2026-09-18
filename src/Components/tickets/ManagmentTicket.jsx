import React, { useEffect, useState } from "react";
import { ticketApi } from "../../Api/Ticket";
import { useAuth } from "../AuthContext.jsx";
import { useParams } from "react-router-dom";

function ManagmentTicket() {
  const [ticket, setTicket] = useState({});
  const [erreur, setErreur] = useState(null);

  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    ticketApi
      .reserve({ clientEmail: user.email, serviceId: id })
      .then((res) => setTicket(res.data))
      .catch((err) => setErreur(err));
  }, [user, id]);
  console.log(erreur);
  console.log(ticket);

  return (
    <div>
      <p>{ticket.id}</p>
      <p>{ticket.numero}</p>
      <p>{ticket.dateCreation}</p>
      <p>{ticket.position}</p>
      <p>{ticket.tempsEstime}</p>
      <p>{ticket.nomService}</p>
      <p>{ticket.nomEtablissement}</p>
      <div>
        {ticket.qrCode && (
          <img
            src={`data:image/png;base64,${ticket.qrCode}`}
            alt="QR Code"
            width="200"
          />
        )}
      </div>
    </div>
  );
}

export default ManagmentTicket;
