import React, { useState } from "react";
import { Search, MapPin, Navigation, Clock, Users, Ticket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./SearchSection.css";
import { etablissementApi } from "../../Api/Etablissement";

export const SearchSection = () => {
  const [serviceNom, setServiceNom] = useState("");
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!serviceNom.trim()) return;

    setLoading(true);
    setError(null);
    setVenues([]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await etablissementApi.getProches(
            serviceNom.trim(),
            latitude,
            longitude,
          );
          setVenues(response.data);
          console.log(response.data);
        } catch (err) {
          setError(err.message || "Erreur lors de la recherche.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(
          "Veuillez autoriser la géolocalisation pour rechercher les établissements proches.",
        );
        setLoading(false);
      },
    );
  };
  const handleServiceId = (idEtablissement) => {
    const etablissement = venues.find((v) => v.id == idEtablissement);
    console.log(etablissement);

    const service = etablissement.services.find(
      (e) => e.nom.toLowerCase() == serviceNom.toLowerCase(),
    );
    console.log(service);

    navigate(`/reserver-ticket/${service.id}`);
  };

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
              value={serviceNom}
              onChange={(e) => setServiceNom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Exemple : Consultation, Banque, Administration..."
              className="sq-search-text-input"
            />
          </div>

          <div className="sq-search-actions">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="sq-btn-geolocate"
            >
              <Navigation size={15} />
              <span>{loading ? "Recherche..." : "Explorer les guichets"}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="sq-reg-alert sq-reg-alert-error">{error}</div>
        )}
        <div className="sq-venues-results-grid">
        {venues.length == 0&&(
          <>
          <div className="sq-venue-card">
            <div className="sq-vcard-top">
              <span className="sq-vcard-service">Hôpital</span>
              <span className="sq-vcard-distance">
                <Navigation size={11} />
                <span>1.2 km</span>
              </span>
            </div>

            <h3 className="sq-vcard-name">Hôpital de Béni Mellal</h3>

            <p className="sq-vcard-address">
              <MapPin size={12} className="sq-vcard-pin" />
              <span>Béni Mellal, Maroc</span>
            </p>

            <div className="sq-vcard-details-row">
              <div className="sq-vcard-detail">
                <Clock size={13} className="sq-vcard-icon-blue" />
                <div>
                  <span className="sq-vcard-d-label">Attente estimée</span>
                  <span className="sq-vcard-d-val">15 min</span>
                </div>
              </div>

              <div className="sq-vcard-detail">
                <Users size={13} className="sq-vcard-icon-amber" />
                <div>
                  <span className="sq-vcard-d-label">Dans la file</span>
                  <span className="sq-vcard-d-val">8 personnes</span>
                </div>
              </div>
            </div>

            <div className="sq-vcard-footer">
              <span className="sq-vcard-hours">Horaires : 08:00 - 18:00</span>
              <button className="sq-vcard-btn-ticket">
                <Ticket size={14} />
                <span>Prendre un ticket</span>
              </button>
            </div>
          </div>
          <div className="sq-venue-card">
            <div className="sq-vcard-top">
              <span className="sq-vcard-service">Banque</span>
              <span className="sq-vcard-distance">
                <Navigation size={11} />
                <span>2.5 km</span>
              </span>
            </div>

            <h3 className="sq-vcard-name">Banque Populaire</h3>

            <p className="sq-vcard-address">
              <MapPin size={12} className="sq-vcard-pin" />
              <span>Centre-ville, Béni Mellal</span>
            </p>

            <div className="sq-vcard-details-row">
              <div className="sq-vcard-detail">
                <Clock size={13} className="sq-vcard-icon-blue" />
                <div>
                  <span className="sq-vcard-d-label">Attente estimée</span>
                  <span className="sq-vcard-d-val">10 min</span>
                </div>
              </div>

              <div className="sq-vcard-detail">
                <Users size={13} className="sq-vcard-icon-amber" />
                <div>
                  <span className="sq-vcard-d-label">Dans la file</span>
                  <span className="sq-vcard-d-val">5 personnes</span>
                </div>
              </div>
            </div>

            <div className="sq-vcard-footer">
              <span className="sq-vcard-hours">Horaires : 08:30 - 16:30</span>
              <button className="sq-vcard-btn-ticket">
                <Ticket size={14} />
                <span>Prendre un ticket</span>
              </button>
            </div>
       
          </div>
          </>
           )}{" "}
        
          {venues.map((v) => (
            <div key={v.id} className="sq-venue-card">
              <div className="sq-vcard-top">
                <span className="sq-vcard-service">{v.type}</span>

                {v.distanceKm !== null && v.distanceKm !== undefined && (
                  <span className="sq-vcard-distance">
                    <Navigation size={11} />
                    <span>{v.distanceKm.toFixed(1)} km</span>
                  </span>
                )}
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

                    <span className="sq-vcard-d-val">
                      {v.tempsAttenteEstimeMinutes} min
                    </span>
                  </div>
                </div>

                <div className="sq-vcard-detail">
                  <Users size={13} className="sq-vcard-icon-amber" />

                  <div>
                    <span className="sq-vcard-d-label">Dans la file</span>

                    <span className="sq-vcard-d-val">
                      {v.nombrePersonnesEnAttente} personnes
                    </span>
                  </div>
                </div>
              </div>

              <div className="sq-vcard-footer">
                <span className="sq-vcard-hours">
                  Horaires : {v.horaireOuverture} - {v.horaireFermeture}
                </span>

                <button
                  onClick={() => handleServiceId(v.id)}
                  className="sq-vcard-btn-ticket"
                >
                  <Ticket size={14} />
                  <span>Prendre un ticket</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
