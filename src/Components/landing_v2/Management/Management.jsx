import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Management.css";

export const Management = () => {
  const metrics = [
    {
      label: "Queue Throughput & Flow Efficiency",
      value: 94,
    },
    {
      label: "Reduction in Patient / Customer Walk-Outs",
      value: 86,
    },
    {
      label: "Staff Productivity & Resource Balancing",
      value: 91,
    },
  ];

  return (
    <section id="for-business" className="sq-mgmt-section">
      <div className="sq-container sq-mgmt-grid">
        
        <div className="sq-mgmt-left">
          <div className="sq-mgmt-img-container">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85"
              alt="Management team collaborating with SmartQueue dispatch"
              className="sq-mgmt-img"
            />

            
            <div className="sq-mgmt-overlay-card">
              <div className="sq-mgmt-overlay-left">
                <div className="sq-mgmt-sq-logo">SQ</div>
                <div className="sq-mgmt-overlay-text">
                  <div className="sq-mgmt-overlay-title">Real-Time Dispatch Console</div>
                  <div className="sq-mgmt-overlay-subtitle">Live multi-counter load balancing</div>
                </div>
              </div>
              <div className="sq-mgmt-badge-active">
                <span className="sq-badge-active-dot"></span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="sq-mgmt-right">
          <div className="sq-mgmt-pretitle">OUR OPERATIONAL SKILLS</div>
          <h2 className="sq-mgmt-headline">
            We Empower Venues to Manage Crowds & Retain Customers
          </h2>
          <p className="sq-mgmt-desc">
            Give your front desk staff, clinic receptionists, and branch managers the superpower
            of real-time queue intelligence. Eliminate overcrowding, reduce walk-aways, and
            dynamically adjust service speeds.
          </p>

          
          <div className="sq-mgmt-bars">
            {metrics.map((item, idx) => (
              <div key={idx} className="sq-mgmt-bar-group">
                <div className="sq-mgmt-bar-header">
                  <span className="sq-mgmt-bar-label">{item.label}</span>
                  <span className="sq-mgmt-bar-val">{item.value}%</span>
                </div>
                <div className="sq-mgmt-track">
                  <div
                    className="sq-mgmt-fill"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          
          <Link to="/register" className="sq-mgmt-link-btn">
            <span>Explore The Manager Console Live Demo</span>
            <ArrowRight size={17} strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Management;
