import React from "react";

import {
  ChevronsUpDown,
  LayoutList,
  DoorOpen,
  BarChart3,
  Users2,
  SlidersHorizontal,
  MessageSquareText,
  PanelsTopLeft,
  Globe,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="organization">
        <div className="organization-box">
          <div className="organization-left">
            <div className="organization-logo">NH</div>

            <div>
              <div className="organization-name">Northstar Health</div>

              <span className="organization-subtitle">Triage & Clinic Hub</span>
            </div>
          </div>

          <ChevronsUpDown size={15} />
        </div>
      </div>

      <div className="sidebar-navigation">
        

        <div className="nav-section">
          <p className="nav-title">Queue Operations</p>

          <button className="nav-item active">
            <span>
              <LayoutList size={16} />
              Live Queue
            </span>

            <strong>04</strong>
          </button>

          <button className="nav-item">
            <span>
              <DoorOpen size={16} />
              Counters & Rooms
            </span>

            <small>3 Active</small>
          </button>

          <button className="nav-item">
            <span>
              <BarChart3 size={16} />
              Hourly Throughput
            </span>
          </button>
        </div>

        

        <div className="nav-section">
          <p className="nav-title">Facility Management</p>

          <a className="nav-link">
            <Users2 size={16} />
            Staff & Physicians
          </a>

          <a className="nav-link">
            <SlidersHorizontal size={16} />
            Services Configuration
          </a>

          <a className="nav-link">
            <MessageSquareText size={16} />
            SMS Broadcasts
          </a>
        </div>

        

        <div className="nav-section">
          <p className="nav-title">System & Views</p>

          <a className="nav-link nav-between">
            <span>
              <PanelsTopLeft size={16} />
              Classic Dashboard
            </span>

            <small>v1</small>
          </a>

          <a className="nav-link">
            <Globe size={16} />
            Public Landing Page
          </a>

          <a className="nav-link">
            <Settings size={16} />
            Console Settings
          </a>
        </div>
      </div>

      

      <div className="queue-load">
        <div className="queue-load-header">
          <span>Queue Load</span>
          <strong>64%</strong>
        </div>

        <div className="load-background">
          <div className="load-progress"></div>
        </div>

        <p>Counter intake within target range</p>
      </div>

      

      <div className="sidebar-user">
        <div className="user-box">
          <div className="user-avatar">AM</div>

          <div className="user-info">
            <span>Alex Morgan</span>
            <small>alex@northstar.health</small>
          </div>

          <button className="logout-button">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
