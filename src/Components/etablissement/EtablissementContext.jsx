import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { etablissementApi } from "../../Api/Etablissement";
import { serviceApi } from "../../Api/Service";

export const EtablissementContext = createContext();

export function useEtablissement() {
  return useContext(EtablissementContext);
}

export default function EtablissementProvider({ children }) {
  const { user } = useAuth();

  const [ticketEtablissement, setTicketEtablissement] = useState([]);
  const [erreur, setErreur] = useState("");
  const [ticketEnCours, setTicketEnCours] = useState([]);
  const [TicketEnAttente, setTicketEnAttente] = useState([]);
  const [servicesEtablissement, setServicesEtablissement] = useState([]);

  const handleTicketsEtablissement = () => {
    if (!user) return;

    etablissementApi
      .getTicketsEtablissement(user.id)
      .then((res) => {
        setTicketEtablissement(res.data.content);
        console.log(res.data);
      })
      .catch((err) => {
        setErreur(err);
      });
  };
  const handleServicesEtablissement = () => {
    if (!user) return;

    serviceApi
      .getAllServicesByEtablissemntId(user.id)
      .then((res) => setServicesEtablissement(res.data))
      .catch((err) => {
        setErreur(err);
      });
  };

  useEffect(() => {
    handleTicketsEtablissement();
    handleServicesEtablissement();
  }, [user]);

  useEffect(() => {
    setTicketEnCours(
      ticketEtablissement.filter((t) => t.statut === "EN_COURS"),
    );
    setTicketEnAttente(
      ticketEtablissement.filter((t) => t.statut === "EN_ATTENTE"),
    );
  }, [ticketEtablissement]);

  return (
    <EtablissementContext.Provider
      value={{
        ticketEtablissement,
        ticketEnCours,
        erreur,
        TicketEnAttente,
        handleTicketsEtablissement,
        handleServicesEtablissement,
        servicesEtablissement,
      }}
    >
      {children}
    </EtablissementContext.Provider>
  );
}
