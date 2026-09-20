import React from "react";

import {
  Search,
  Menu,
  ArrowLeftRight,
  Volume2,
  Moon,
  Bell,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <button className="mobile-menu">
          <Menu size={16} />
        </button>

        <span>Dashboard</span>
        <span>/</span>
        <span>Northstar Health</span>
        <span>/</span>

        <strong>Live Dispatch</strong>
      </div>

      <div className="topbar-actions">
        <button className="search-button">
          <Search size={14} />

          <span>Search queue...</span>

          <kbd>⌘K</kbd>
        </button>

        <div className="separator"></div>

        <button className="classic-button">
          <ArrowLeftRight size={14} />
          Classic View
        </button>

        <button className="top-icon">
          <Volume2 size={16} />
        </button>

        <button className="top-icon">
          <Moon size={16} />
        </button>

        <button className="top-icon notification">
          <Bell size={16} />

          <span className="notification-dot"></span>
        </button>

        <div className="top-avatar">AM</div>
      </div>
    </header>
  );
}
