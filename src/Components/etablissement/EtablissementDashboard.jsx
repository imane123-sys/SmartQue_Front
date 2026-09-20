import React from "react";
import "./EtablissementDashboard.css";

import Topbar from "./Topbar";
import NowServing from "./NowServing";
import CommandModal from "./CommandModal";
import WalkInModal from "./WalkInModal";
import Sidebar from "./SideBar";
import PageHeader from "./Pageheader";
import StatsCards from "./StatsCards";
import Queuetabs from "./Queuetabs";

export default function EtablissementDashboard() {
  return (
    <div className="dashboard-container">
      <CommandModal />
      <WalkInModal />

      <Sidebar />

      <div className="main-area">
        <Topbar />

        <main className="content">
          <PageHeader />

          <StatsCards />

          <NowServing />

          <Queuetabs />
        </main>
      </div>
    </div>
  );
}
