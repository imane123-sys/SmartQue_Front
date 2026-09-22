import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import RegisterClient from "./Components/RegisterClient";
import RegisterEtablissement from "./Components/RegisterEtablissement";
import Clients from "./Components/clients/Clients";
import Services from "./Components/services/Services";
import AuthGuard from "./Components/route_guard/AuthGuard";
import { Tickets } from "lucide-react";
import LandingV2 from "./Components/landing_v2/LandingV2";
import SearchSection from "./Components/SearchSection/SearchSection";
import ManagmentTicket from "./Components/tickets/ManagmentTicket";
import Dashboardclient from "./Components/clients/Dashboardclient";
import EtablissementDashboard from "./Components/etablissement/EtablissementDashboard";
import TableServiceEtablissement from "./Components/etablissement/TableServiceEtablissement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingV2 />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterClient />} />
      <Route
        path="/register-etablissement"
        element={<RegisterEtablissement />}
      />
      <Route path="/reserver-ticket/:id" element={<ManagmentTicket />} />
      <Route path="/Etablissement-service" element={<SearchSection />} />
      <Route path="/dashboard-client" element={<Dashboardclient />} />
      <Route
        path="/dashboard-etablissement"
        element={<EtablissementDashboard />}
      />
      <Route
        path="/register-etablissement"
        element={<RegisterEtablissement />}
      />
      <Route
        path="/services-etablissement"
        element={<TableServiceEtablissement />}
      />

      <Route element={<AuthGuard role="ADMIN" />}></Route>

      <Route path="/clients" element={<Clients />} />
      <Route path="/services" element={<Services />} />
      <Route path="/tickets" element={Tickets} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
