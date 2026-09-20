import React from "react";
import { Calendar, Plus, PhoneForwarded } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="page-header">
      <div>
        <div className="page-title">
          <h1>Queue Operations</h1>
          <span className="live-badge">Live</span>
        </div>

        <p className="page-description">
          Monitor and manage today's patient flow across all counters.
        </p>

        <div className="date-info">
          <Calendar size={16} />
          <span>Monday, September 20, 2026</span>
        </div>
      </div>

      <div className="page-actions">
        <button className="secondary-button">
          <Plus size={18} />
          Add Visitor
        </button>

        <button className="primary-button">
          <PhoneForwarded size={18} />
          Call Next
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
