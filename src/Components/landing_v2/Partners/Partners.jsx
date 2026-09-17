import React from "react";
import { Heart, Package, Building2, PlusCircle, Train, Sparkles } from "lucide-react";
import "./Partners.css";

export const Partners = () => (
  <section className="sq-partners-section">
    <div className="sq-container">
      <h2 className="sq-partners-title">Proud Queue Management Partners With</h2>
      <div className="sq-partners-row">
        
        <div className="sq-partner-item">
          <Heart size={18} strokeWidth={2} />
          <span>
            <span className="sq-partner-bold">Google</span>
            <span className="sq-partner-light">Health</span>
          </span>
        </div>

        
        <div className="sq-partner-item">
          <Package size={18} strokeWidth={2} />
          <span>
            <span className="sq-partner-bold">amazon</span>
            <span className="sq-partner-light">care</span>
          </span>
        </div>

        
        <div className="sq-partner-item">
          <Building2 size={18} strokeWidth={2} />
          <span className="sq-partner-bold">Santander</span>
        </div>

        
        <div className="sq-partner-item">
          <PlusCircle size={18} strokeWidth={2} />
          <span>
            <span className="sq-partner-bold">City</span>
            <span className="sq-partner-light">Clinic</span>
          </span>
        </div>

        
        <div className="sq-partner-item">
          <Train size={18} strokeWidth={2} />
          <span>
            <span className="sq-partner-bold">Metro</span>
            <span className="sq-partner-light">Transit</span>
          </span>
        </div>

        
        <div className="sq-partner-item">
          <Sparkles size={18} strokeWidth={2} />
          <span className="sq-partner-bold">NOXIS</span>
        </div>
      </div>
    </div>
  </section>
);
export default Partners;
