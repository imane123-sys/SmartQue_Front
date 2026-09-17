import React, { useEffect, useState } from "react";
import { Search, MapPin, Navigation, Clock, Users, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import "./SearchSection.css";
import { etablissementApi } from "../../Api/Etablissement";

export const SearchSection = () => {
  etablissementApi.getProches();

  return (
    <section id="recherche" className="sq-search-section">
      <div className="sq-container">
        <div className="sq-search-header">
          <div className="sq-search-pretitle">
            SERVICES & ÉTABLISSEMENTS À BÉNI MELLAL
          </div>

          <h2 className="sq-search-headline">
            Trouvez un établissement & prenez votre place en direct
          </h2>

          <p className="sq-search-desc">
            Découvrez les établissements et services disponibles à Béni Mellal
            et rejoignez leur file virtuelle.
          </p>
        </div>

        <div className="sq-search-engine-box">
          <div className="sq-search-input-wrapper">
            <Search size={20} className="sq-search-icon" />

            <input
              type="text"
              readOnly
              placeholder="Exemple : Consultation, Banque, Administration..."
              className="sq-search-text-input"
            />
          </div>

          <div className="sq-search-actions">
            <Link to="/register" className="sq-btn-geolocate">
              <Navigation size={15} />
              <span>Explorer les guichets</span>
            </Link>
          </div>
        </div>

        <div className="sq-venues-results-grid">
          {venues.map((v) => (
            <div key={v.id} className="sq-venue-card">
              <div className="sq-vcard-top">
                <span className="sq-vcard-service">{v.service}</span>

                <span className="sq-vcard-distance">
                  <Navigation size={11} />
                  <span>{v.distanceKm}</span>
                </span>
              </div>

              <h3 className="sq-vcard-name">{v.nom}</h3>

              <p className="sq-vcard-address">
                <MapPin size={12} className="sq-vcard-pin" />
                <span>{v.adresse}</span>
              </p>

              <div className="sq-vcard-details-row">
                <div className="sq-vcard-detail">
                  <Clock size={13} className="sq-vcard-icon-blue" />

                  <div>
                    <span className="sq-vcard-d-label">Attente estimée</span>

                    <span className="sq-vcard-d-val">{v.attenteEstimee}</span>
                  </div>
                </div>

                <div className="sq-vcard-detail">
                  <Users size={13} className="sq-vcard-icon-amber" />

                  <div>
                    <span className="sq-vcard-d-label">Dans la file</span>

                    <span className="sq-vcard-d-val">
                      {v.personnesEnAttente} personnes
                    </span>
                  </div>
                </div>
              </div>

              <div className="sq-vcard-footer">
                <span className="sq-vcard-hours">Horaires : {v.horaires}</span>

                <Link to="/register" className="sq-vcard-btn-ticket">
                  <Ticket size={14} />
                  <span>Prendre un ticket</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
