import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import GlobalDashboard from "./GlobalDashboard";
import EtablissementsManagement from "./EtablissementsManagement";
import ServicesManagement from "./ServicesManagement";
import UtilisateursManagement from "./UtilisateursManagement";
import TicketsConsultation from "./TicketsConsultation";

import { etablissementApi } from "../../Api/Etablissement";
import { serviceApi } from "../../Api/Service";
import { clientApi } from "../../Api/Client";
import { ticketApi } from "../../Api/Ticket";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [etablissements, setEtablissements] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const chargerDonnees = async () => {
    try {
      const resEtab = await etablissementApi.getAll(0, 100);
      const listeEtab = resEtab.data.content || resEtab.data;
      setEtablissements(listeEtab);

      const resServ = await serviceApi.getAll();
      setServices(resServ.data);

      const resClient = await clientApi.getAll(0, 100);
      const listeClient = resClient.data.content || resClient.data;
      setClients(listeClient);

      const resTicket = await ticketApi.getAll();
      setTickets(resTicket.data);
    } catch (e) {
      setError("Erreur de connexion avec le serveur.");
    }

    setLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    chargerDonnees();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    chargerDonnees();
  };

  const stats = {
    etablissementsCount: etablissements.length,
    servicesCount: services.length,
    utilisateursCount: clients.length,
    ticketsCount: tickets.length,
  };

  return (
    <div className="admin-container">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
      />

      <div className="admin-main-area">
        <AdminTopbar
          activeTab={activeTab}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="admin-content">
          {error && <div className="admin-alert error">{error}</div>}

          {loading ? (
            <div
              style={{ textAlign: "center", padding: "50px", color: "#64748b" }}
            >
              Chargement de l'espace administration...
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <GlobalDashboard
                  etablissements={etablissements}
                  services={services}
                  clients={clients}
                  tickets={tickets}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === "etablissements" && (
                <EtablissementsManagement
                  etablissements={etablissements}
                  onRefresh={handleRefresh}
                />
              )}

              {activeTab === "creer-etablissement" && (
                <EtablissementsManagement
                  etablissements={etablissements}
                  onRefresh={handleRefresh}
                  openAddModalInitially={true}
                />
              )}

              {activeTab === "services" && (
                <ServicesManagement
                  services={services}
                  etablissements={etablissements}
                  onRefresh={handleRefresh}
                />
              )}

              {activeTab === "utilisateurs" && (
                <UtilisateursManagement
                  clients={clients}
                  onRefresh={handleRefresh}
                />
              )}

              {activeTab === "tickets" && (
                <TicketsConsultation
                  tickets={tickets}
                  etablissements={etablissements}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
