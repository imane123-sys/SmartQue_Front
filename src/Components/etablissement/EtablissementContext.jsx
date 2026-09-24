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
        const tickets = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.content)
            ? res.data.content
            : [];
        setTicketEtablissement(tickets);
        console.log(res.data);
      })
      .catch((err) => {
        setErreur(err?.message || "Erreur de chargement");
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
    const list = Array.isArray(ticketEtablissement) ? ticketEtablissement : [];
    setTicketEnCours(
      list.filter(
        (t) =>
          String(t?.statut || "")
            .trim()
            .toUpperCase()
            .replace(/[\s-]/g, "_") === "EN_COURS",
      ),
    );
    setTicketEnAttente(
      list.filter(
        (t) =>
          String(t?.statut || "")
            .trim()
            .toUpperCase()
            .replace(/[\s-]/g, "_") === "EN_ATTENTE",
      ),
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
