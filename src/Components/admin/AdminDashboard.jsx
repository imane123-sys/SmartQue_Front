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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [etablissements, setEtablissements] = useState([]);
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");

      let etabsData = [];
      try {
        const etabRes = await etablissementApi.getAll(0, 100);
        etabsData = Array.isArray(etabRes.data?.content)
          ? etabRes.data.content
          : Array.isArray(etabRes.data)
            ? etabRes.data
            : [];
        setEtablissements(etabsData);
      } catch (err) {
        console.warn("Erreur chargement établissements:", err);
      }

      let servicesData = [];
      try {
        const servRes = await serviceApi.getAll();
        servicesData = Array.isArray(servRes.data) ? servRes.data : [];
        setServices(servicesData);
      } catch (err) {
        console.warn("Erreur chargement services:", err);
      }

      try {
        const clientRes = await clientApi.getAll(0, 100);
        const clientsData = Array.isArray(clientRes.data?.content)
          ? clientRes.data.content
          : Array.isArray(clientRes.data)
            ? clientRes.data
            : [];
        setClients(clientsData);
      } catch (err) {
        console.warn("Erreur chargement clients:", err);
      }

      try {
        let allTickets = [];
        const ticketPromises = etabsData.map((e) =>
          etablissementApi
            .getTicketsEtablissement(e.id, 0, 100)
            .then((res) =>
              Array.isArray(res.data?.content)
                ? res.data.content
                : Array.isArray(res.data)
                  ? res.data
                  : [],
            )
            .catch(() => []),
        );

        const results = await Promise.all(ticketPromises);
        results.forEach((list) => {
          if (Array.isArray(list)) {
            allTickets.push(...list);
          }
        });

        const uniqueTicketsMap = new Map();
        allTickets.forEach((t) => {
          if (t && t.id) uniqueTicketsMap.set(t.id, t);
        });

        setTickets(Array.from(uniqueTicketsMap.values()));
      } catch (err) {
        console.warn("Erreur chargement tickets:", err);
      }
    } catch (err) {
      setError(err?.message || "Erreur de chargement des données.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                color: "var(--admin-muted-text)",
                fontSize: "14px",
                gap: "10px",
              }}
            >
              <span>Chargement de l'espace administration...</span>
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
