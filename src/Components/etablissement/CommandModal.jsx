import React from "react";
import {
  Search,
  Stethoscope,
  FlaskConical,
  X,
  ChevronsUpDown,
  PlusCircle,
} from "lucide-react";

const CommandModal = () => {
  return (
    <div className="command-modal">
      <div className="command-box">
        
        <div className="command-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search patients, tickets, or actions..."
          />
          <span>ESC</span>
        </div>

        
        <div className="command-section">
          <p className="command-title">Quick Actions</p>

          <button className="command-item">
            <PlusCircle size={18} />
            <span>Add Visitor</span>
          </button>

          <button className="command-item">
            <Stethoscope size={18} />
            <span>Call Next Patient</span>
          </button>
        </div>

        
        <div className="command-section">
          <p className="command-title">Queue Services</p>

          <button className="command-item">
            <Stethoscope size={18} />
            <span>Consultation & Clinical Assessment</span>
            <span className="command-count">12</span>
          </button>

          <button className="command-item">
            <FlaskConical size={18} />
            <span>Laboratory Intake</span>
            <span className="command-count">8</span>
          </button>
        </div>

        
        <div className="command-footer">
          <span>
            <ChevronsUpDown size={14} />
            Navigate
          </span>

          <span>
            <span className="command-key">↵</span>
            Select
          </span>

          <span>
            <X size={14} />
            Close
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandModal;
