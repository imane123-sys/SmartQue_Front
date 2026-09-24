import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login";
import RegisterClient from "./Components/RegisterClient";
import RegisterEtablissement from "./Components/RegisterEtablissement";
import LandingV2 from "./Components/landing_v2/LandingV2";
import SearchSection from "./Components/SearchSection/SearchSection";
import NotFound from "./Components/NotFound/NotFound";

import Dashboardclient from "./Components/clients/Dashboardclient";
import ManagmentTicket from "./Components/tickets/ManagmentTicket";

import EtablissementDashboard from "./Components/etablissement/EtablissementDashboard";
import TableServiceEtablissement from "./Components/etablissement/TableServiceEtablissement";

import AdminDashboard from "./Components/admin/AdminDashboard";
import Clients from "./Components/clients/Clients";
import Services from "./Components/services/Services";

import RoleGuard from "./Components/route_guard/RoleGuard";

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
      <Route path="/Etablissement-service" element={<SearchSection />} />

      <Route element={<RoleGuard allowedRoles={["CLIENT", "ADMIN"]} />}>
        <Route path="/dashboard-client" element={<Dashboardclient />} />
        <Route path="/reserver-ticket/:id" element={<ManagmentTicket />} />
      </Route>

      <Route element={<RoleGuard allowedRoles={["ETABLISSEMENT", "ADMIN"]} />}>
        <Route
          path="/dashboard-etablissement"
          element={<EtablissementDashboard />}
        />
        <Route
          path="/services-etablissement"
          element={<TableServiceEtablissement />}
        />
      </Route>


      <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
