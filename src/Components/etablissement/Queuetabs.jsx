import React, { useState } from "react";

import { Search } from "lucide-react";

import QueueTable from "./QueueTable";
import Counters from "./Counters";
import Analytics from "./Analytics";
import { etablissementApi } from "../../Api/Etablissement";
import { useEtablissement } from "./EtablissementContext";
import NowServing from "./NowServing";

export default function Queuetabs() {
  const { ticketEtablissement } = useEtablissement();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const tickets = ticketEtablissement || [];

  const services = [
    ...new Set(tickets.map((t) => t.nomService).filter(Boolean)),
  ];

  const filteredTickets = tickets.filter((t) => {
    const matchClient = t.nomClient
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchServiceSearch = t.nomService
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchSearch = matchClient || matchServiceSearch;

    const matchSelectedService =
      selectedService === "" || t.nomService === selectedService;

    return matchSearch && matchSelectedService;
  });

  return (
    <div className="tabs-section">
      <div className="tabs-header">
        <div className="filters">
          <div className="table-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Filter tickets, names, services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">All Services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <NowServing />

      <QueueTable tickets={filteredTickets} />

      <Counters />

      <Analytics />
    </div>
  );
}
