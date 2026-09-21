import React, { useContext } from "react";

import {
  Search,
  Menu,
  ArrowLeftRight,
  Volume2,
  Moon,
  Bell,
} from "lucide-react";
import { useAuth } from "../AuthContext";

export default function Topbar() {
  const {user}= useAuth();
  return (
    <header className="topbar">
    
      <div className="topbar-actions">
      

        <button className="top-icon notification">
          <Bell size={16} />

          <span className="notification-dot"></span>
        </button>

        <div className="top-avatar"></div>
      </div>
    </header>
  );
}
