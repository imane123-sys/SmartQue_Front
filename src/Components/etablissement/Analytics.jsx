import React from "react";

export default function Analytics() {
  return (
    <div className="analytics-section">
      <div className="analytics-card">
        <div className="analytics-header">
          <div>
            <h3>Hourly Patient Arrival Volume</h3>

            <p>
              Distribution of check-ins throughout current operational shift.
            </p>
          </div>

          <div className="analytics-legend">
            <span>
              <i className="legend-blue"></i>
              Completed
            </span>

            <span>
              <i className="legend-gray"></i>
              Waiting
            </span>
          </div>
        </div>

        <div className="chart">
          <div className="bar-column">
            <span>4</span>
            <div className="bar light" style={{ height: "25%" }}></div>
            <small>08:00</small>
          </div>

          <div className="bar-column">
            <span>8</span>
            <div className="bar medium" style={{ height: "50%" }}></div>
            <small>09:00</small>
          </div>

          <div className="bar-column">
            <span>14</span>
            <div className="bar peak" style={{ height: "85%" }}></div>
            <small>10:00</small>
          </div>

          <div className="bar-column">
            <span>11</span>
            <div className="bar current" style={{ height: "70%" }}></div>
            <small>11:00</small>
          </div>

          <div className="bar-column">
            <span>6</span>
            <div className="bar gray" style={{ height: "40%" }}></div>
            <small>12:00</small>
          </div>

          <div className="bar-column">
            <span>5</span>
            <div className="bar gray" style={{ height: "35%" }}></div>
            <small>13:00</small>
          </div>

          <div className="bar-column">
            <span>9</span>
            <div className="bar gray" style={{ height: "55%" }}></div>
            <small>14:00</small>
          </div>

          <div className="bar-column">
            <span>7</span>
            <div className="bar gray" style={{ height: "45%" }}></div>
            <small>15:00</small>
          </div>
        </div>

        <div className="chart-footer">
          <span>
            Peak check-in window: 10:00 - 11:30 AM (Emergency + Consultations)
          </span>

          <span>Updated 1 min ago</span>
        </div>
      </div>
    </div>
  );
}
