import React from "react";

export default function Counters() {
  return (
    <div className="counters-section">
      <div className="counter-grid">
        

        <div className="counter-card">
          <div>
            <div className="counter-header">
              <span>Room 01</span>

              <span className="room-status available">
                <i></i>
                Available
              </span>
            </div>

            <h4>Dr. Garcia</h4>

            <p>Triage & Routine Checkups</p>
          </div>

          <div className="counter-footer">
            <span>Ready for next patient</span>

            <button>Dispatch</button>
          </div>
        </div>

        

        <div className="counter-card">
          <div>
            <div className="counter-header">
              <span>Room 02</span>

              <span className="room-status service">
                <i></i>
                In Service
              </span>
            </div>

            <h4>Dr. Moreau</h4>

            <p>
              Serving Ticket <strong className="blue-text">#A-026</strong>
            </p>
          </div>

          <div className="counter-footer">
            <span>Active for 03:42</span>

            <button className="primary-small">Complete</button>
          </div>
        </div>

        

        <div className="counter-card">
          <div>
            <div className="counter-header">
              <span>Room 03</span>

              <span className="room-status">Paused</span>
            </div>

            <h4>Lab Intake</h4>

            <p>Blood Samples & Diagnostics</p>
          </div>

          <div className="counter-footer">
            <span>Sanitization cycle</span>

            <button>Resume</button>
          </div>
        </div>
      </div>
    </div>
  );
}
