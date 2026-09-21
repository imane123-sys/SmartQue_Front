import React from "react";

import { Search } from "lucide-react";

import QueueTable from "./QueueTable";
import Counters from "./Counters";
import Analytics from "./Analytics";
import { etablissementApi } from "../../Api/Etablissement";
export default function Queuetabs() {
  return (
    <div className="tabs-section">
      

      <div className="tabs-header">
        <div className="tabs">
          <button className="tab active">Live Queue (4)</button>

          <button className="tab">Counter Dispatch (3)</button>

          <button className="tab">Hourly Analytics</button>
        </div>

        

        <div className="filters">
          <div className="table-search">
            <Search size={14} />

            <input
              type="text"
              placeholder="Filter tickets, names, services..."
            />
          </div>

          <select>
            <option>All Services</option>
            <option>Consultation</option>
            <option>Blood Sample</option>
            <option>Pediatrics</option>
          </select>
        </div>
      </div>

      <QueueTable />

      <Counters />

      <Analytics />
    </div>
  );
}
