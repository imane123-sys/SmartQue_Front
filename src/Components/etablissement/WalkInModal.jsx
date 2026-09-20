import React from "react";
import { X } from "lucide-react";

export default function WalkInModal() {
  return (
    <div className="walkin-modal">
      <div className="walkin-box">
        <div className="walkin-header">
          <div>
            <h3>Add Walk-In Visitor</h3>

            <p>Issue an instant queue ticket for an on-premise patient.</p>
          </div>

          <button className="icon-button">
            <X size={16} />
          </button>
        </div>

        <div className="walkin-form">
          <div className="form-group">
            <label>Full Name</label>

            <input type="text" placeholder="e.g. Marie Dupont" />
          </div>

          <div className="form-group">
            <label>Service Required</label>

            <select>
              <option>General Consultation</option>

              <option>Blood Sample / Lab Intake</option>

              <option>Pediatrics & Care</option>

              <option>Emergency Triage</option>
            </select>
          </div>

          <div className="checkbox-row">
            <input type="checkbox" />

            <span>Mark as Priority (Elderly, Urgency, Reduced Mobility)</span>
          </div>

          <div className="walkin-actions">
            <button className="secondary-button">Cancel</button>

            <button className="primary-button">Issue Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}
