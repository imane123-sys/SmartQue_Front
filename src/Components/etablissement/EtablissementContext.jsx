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
  const [ticketEnCours, setTicketEnCours] = useState([]);
  const [TicketEnAttente, setTicketEnAttente] = useState([]);
  const [servicesEtablissement, setServicesEtablissement] = useState([]);
  const [erreur, setErreur] = useState("");

  const handleTicketsEtablissement = () => {
    if (!user) return;

    etablissementApi
      .getTicketsEtablissement(user.id)
      .then((res) => {
        const liste = res.data?.content || res.data || [];

        setTicketEtablissement(liste);

        setTicketEnCours(liste.filter((t) => t.statut === "EN_COURS"));
        setTicketEnAttente(liste.filter((t) => t.statut === "EN_ATTENTE"));
      })
      .catch((err) => {
        setErreur("Erreur lors du chargement des tickets");
      });
  };

  const handleServicesEtablissement = () => {
    if (!user) return;

    serviceApi
      .getAllServicesByEtablissemntId(user.id)
      .then((res) => setServicesEtablissement(res.data))
      .catch((err) => setErreur("Erreur chargement services"));
  };

  useEffect(() => {
    if (user) {
      handleTicketsEtablissement();
      handleServicesEtablissement();
    }
  }, [user]);

  return (
    <EtablissementContext.Provider
      value={{
        ticketEtablissement,
        ticketEnCours,
        TicketEnAttente,
        servicesEtablissement,
        erreur,
        handleTicketsEtablissement,
        handleServicesEtablissement,
      }}
    >
      {children}
    </EtablissementContext.Provider>
  );
}
