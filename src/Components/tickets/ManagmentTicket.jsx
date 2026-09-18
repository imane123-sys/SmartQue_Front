import React from "react";
import { ticketApi } from "../../Api/Ticket";
import { useAuth } from "../AuthContext.jsx";
function ManagmentTicket() {
  const [ticket, setTicket] = useState({});
  const [response, setResponse] = useState({});
  const [erreur, setErreur] = useState({});
  const ReserverTicket = () => {
    ticketApi.reserve();
  };

  return <div></div>;
}

export default ManagmentTicket;
