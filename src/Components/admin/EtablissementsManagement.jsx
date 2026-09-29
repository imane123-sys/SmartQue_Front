import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { etablissementApi } from "../../Api/Etablissement";
import { registerEtablissement } from "../../Api/AuthService";

const formulaireVide = {
  nom: "",
  email: "",
  password: "",
  adresse: "",
  telephone: "",
  type: "Clinique",
  horaireOuverture: "08:00",
  horaireFermeture: "18:00",
};

export default function EtablissementsManagement({
  etablissements = [],
  onRefresh,
}) {
  const [recherche, setRecherche] = useState("");
  const [typeChoisi, setTypeChoisi] = useState("ALL");

  const [modalOuverte, setModalOuverte] = useState(false);
  const [etablissementEnModif, setEtablissementEnModif] = useState(null);
  const [idASupprimer, setIdASupprimer] = useState(null);

  const [formData, setFormData] = useState(formulaireVide);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);

  const types = [...new Set(etablissements.map((e) => e.type).filter(Boolean))];

  const etablissementsFiltres = etablissements.filter((e) => {
    const correspondRecherche =
      (e.nom || "").toLowerCase().includes(recherche.toLowerCase()) ||
      (e.adresse || "").toLowerCase().includes(recherche.toLowerCase()) ||
      (e.telephone || "").includes(recherche);

    const correspondType = typeChoisi === "ALL" || e.type === typeChoisi;

    return correspondRecherche && correspondType;
  });

  const ouvrirAjout = () => {
    setEtablissementEnModif(null);
    setFormData(formulaireVide);
    setErreur("");
    setModalOuverte(true);
  };

  const ouvrirModification = (etab) => {
    setEtablissementEnModif(etab);
    setFormData({
      nom: etab.nom || "",
      email: etab.email || "",
      password: "",
      adresse: etab.adresse || "",
      telephone: etab.telephone || "",
      type: etab.type || "Clinique",
      horaireOuverture: etab.horaireOuverture || "08:00",
      horaireFermeture: etab.horaireFermeture || "18:00",
    });
    setErreur("");
    setModalOuverte(true);
  };

  const fermerModale = () => {
    setModalOuverte(false);
    setEtablissementEnModif(null);
    setErreur("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErreur("");

    const donnees = {
      ...formData,
      password: formData.password || "200585",
    };

    try {
      if (etablissementEnModif) {
        await etablissementApi.update(etablissementEnModif.id, donnees);
        setSucces("Établissement modifié avec succès !");
      } else {
        await registerEtablissement(donnees);
        setSucces("Compte établissement créé avec succès !");
      }

      fermerModale();
      if (onRefresh) onRefresh();
      setTimeout(() => setSucces(""), 4000);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur d'enregistrement.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await etablissementApi.delete(id);
      setIdASupprimer(null);
      setSucces("Établissement supprimé avec succès.");
      if (onRefresh) onRefresh();
      setTimeout(() => setSucces(""), 4000);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur de suppression.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-etablissements-view">
      {succes && <div className="admin-alert success">{succes}</div>}
      {erreur && <div className="admin-alert error">{erreur}</div>}

      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, adresse, téléphone..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <select
            value={typeChoisi}
            onChange={(e) => setTypeChoisi(e.target.value)}
            className="admin-filter-select"
          >
            <option value="ALL">
              Tous les types ({etablissements.length})
            </option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={ouvrirAjout}
        >
          <Plus size={16} />
          <span>Ajouter Établissement</span>
        </button>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom de l'Établissement</th>
                <th>Type</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Horaires</th>
                <th>En attente</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {etablissementsFiltres.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-table-empty">
                    Aucun établissement ne correspond aux critères.
                  </td>
                </tr>
              ) : (
                etablissementsFiltres.map((etab) => (
                  <tr key={etab.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: "monospace",
                          color: "var(--admin-muted-text)",
                        }}
                      >
                        #{etab.id}
                      </span>
                    </td>
                    <td>
                      <strong>{etab.nom}</strong>
                      {etab.email && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "var(--admin-muted-text)",
                          }}
                        >
                          {etab.email}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="admin-badge role-etablissement">
                        {etab.type || "Établissement"}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                        }}
                      >
                        <MapPin size={13} color="var(--admin-muted-text)" />
                        <span>{etab.adresse || "—"}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                        }}
                      >
                        <Phone size={13} color="var(--admin-muted-text)" />
                        <span>{etab.telephone || "—"}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                        }}
                      >
                        <Clock size={13} color="var(--admin-muted-text)" />
                        <span>
                          {etab.horaireOuverture || "08:00"} -{" "}
                          {etab.horaireFermeture || "18:00"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-counter-pill">
                        {etab.nombrePersonnesEnAttente || 0}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-action-icon-btn edit"
                          onClick={() => ouvrirModification(etab)}
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn delete"
                          onClick={() => setIdASupprimer(etab.id)}
                          title="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOuverte && (
        <div className="admin-modal-overlay" onClick={fermerModale}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>
                  {etablissementEnModif
                    ? "Modifier l'Établissement"
                    : "Créer un Compte Établissement"}
                </h3>
                <p>
                  {etablissementEnModif
                    ? "Mettez à jour les informations de cet établissement."
                    : "Renseignez les coordonnées pour créer un nouvel établissement."}
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={fermerModale}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                {erreur && (
                  <div className="admin-alert error" style={{ margin: 0 }}>
                    {erreur}
                  </div>
                )}

                <div className="admin-form-group">
                  <label>Nom de l'Établissement *</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    placeholder="ex: Clinique Al Amal, BMCE Bank..."
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Email de connexion *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="contact@etablissement.ma"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>
                      {etablissementEnModif
                        ? "Nouveau Mot de passe (optionnel)"
                        : "Mot de passe *"}
                    </label>
                    <input
                      type="password"
                      name="password"
                      required={!etablissementEnModif}
                      placeholder={
                        etablissementEnModif
                          ? "Laisser vide pour ne pas changer"
                          : "••••••••"
                      }
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Type d'établissement *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="Clinique">Clinique</option>
                      <option value="Hôpital">Hôpital</option>
                      <option value="Banque">Banque</option>
                      <option value="Pharmacie">Pharmacie</option>
                      <option value="Administration">Administration</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Téléphone</label>
                    <input
                      type="text"
                      name="telephone"
                      placeholder="ex: 0523488100"
                      value={formData.telephone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Adresse physique *</label>
                  <input
                    type="text"
                    name="adresse"
                    required
                    placeholder="ex: Avenue Mohammed V, Béni Mellal"
                    value={formData.adresse}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Horaire d'ouverture</label>
                    <input
                      type="time"
                      name="horaireOuverture"
                      value={formData.horaireOuverture}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Horaire de fermeture</label>
                    <input
                      type="time"
                      name="horaireFermeture"
                      value={formData.horaireFermeture}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={fermerModale}
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="admin-primary-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Enregistrement..."
                    : etablissementEnModif
                      ? "Enregistrer les modifications"
                      : "Créer l'Établissement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {idASupprimer && (
        <div
          className="admin-modal-overlay"
          onClick={() => setIdASupprimer(null)}
        >
          <div
            className="admin-modal"
            style={{ maxWidth: "440px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>Confirmer la suppression</h3>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setIdASupprimer(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="admin-modal-body">
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--admin-foreground)",
                  lineHeight: "1.5",
                }}
              >
                Êtes-vous certain de vouloir supprimer cet établissement ? Cette
                action est irréversible.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setIdASupprimer(null)}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="button"
                className="admin-primary-btn"
                style={{ background: "var(--admin-danger)" }}
                onClick={() => handleDelete(idASupprimer)}
                disabled={loading}
              >
                {loading ? "Suppression..." : "Confirmer la suppression"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
