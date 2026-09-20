import React from "react";
import { Check } from "lucide-react";

export default function NowServing() {
  return (
    <div className="now-serving">
      <div className="serving-left">
        <div className="ticket-badge">
          <span>Ticket</span>
          <strong>A-026</strong>
        </div>

        <div>
          <div className="serving-title">
            <span>Now Serving Counter</span>

            <i></i>

            <strong>Room 02 — Dr. Moreau</strong>
          </div>

          <p>Consultation & Clinical Assessment</p>
        </div>
      </div>

      <div className="serving-right">
        <div className="elapsed">
          <span>Elapsed Time</span>

          <strong>03:42</strong>
        </div>

        <button className="primary-button">
          <Check size={14} />
          Complete & Call Next
        </button>
      </div>
    </div>
  );
}
