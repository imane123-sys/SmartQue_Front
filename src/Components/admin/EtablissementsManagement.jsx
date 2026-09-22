import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Building2,
  Phone,
  MapPin,
  Clock,
  Mail,
  Lock,
} from "lucide-react";
import { etablissementApi } from "../../Api/Etablissement";
import { registerEtablissement } from "../../Api/AuthService";

export default function EtablissementsManagement({
  etablissements = [],
  onRefresh,
  openAddModalInitially = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(openAddModalInitially);
  const [editingEtablissement, setEditingEtablissement] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const initialFormData = {
    nom: "",
    email: "",
    password: "",
    adresse: "",
    telephone: "",
    type: "Clinique",
    horaireOuverture: "08:00",
    horaireFermeture: "18:00",
  };

  const [formData, setFormData] = useState(initialFormData);

  const types = Array.from(
    new Set(etablissements.map((e) => e.type).filter(Boolean)),
  );

  const filteredEtablissements = etablissements.filter((e) => {
    const matchesSearch =
      (e.nom || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.adresse || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.telephone || "").includes(searchTerm);
    const matchesType =
      filterType === "ALL" ||
      (e.type || "").toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setEditingEtablissement(null);
    setFormData(initialFormData);
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (etab) => {
    setEditingEtablissement(etab);
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
    setFormError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEtablissement(null);
    setFormError("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      if (editingEtablissement) {
        await etablissementApi.update(editingEtablissement.id, {
          nom: formData.nom,
          adresse: formData.adresse,
          telephone: formData.telephone,
          type: formData.type,
          email: formData.email,
          horaireOuverture: formData.horaireOuverture,
          horaireFermeture: formData.horaireFermeture,
          password: formData.password || "200585",
        });
        setFormSuccess("Établissement modifié avec succès !");
      } else {
        await registerEtablissement({
          nom: formData.nom,
          email: formData.email,
          password: formData.password || "200585",
          adresse: formData.adresse,
          telephone: formData.telephone,
          type: formData.type,
          horaireOuverture: formData.horaireOuverture,
          horaireFermeture: formData.horaireFermeture,
        });
        setFormSuccess("Compte établissement créé avec succès !");
      }

      handleCloseModal();
      if (onRefresh) onRefresh();
      setTimeout(() => setFormSuccess(""), 4000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de l'enregistrement de l'établissement.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await etablissementApi.delete(id);
      setDeleteConfirmId(null);
      setFormSuccess("Établissement supprimé avec succès.");
      if (onRefresh) onRefresh();
      setTimeout(() => setFormSuccess(""), 4000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de la suppression de l'établissement.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-etablissements-view">
      {formSuccess && <div className="admin-alert success">{formSuccess}</div>}
      {formError && <div className="admin-alert error">{formError}</div>}

      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, adresse, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
          onClick={handleOpenAdd}
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
              {filteredEtablissements.length === 0 ? (
                <tr>
                  <td colSpan={8} className="admin-table-empty">
                    Aucun établissement ne correspond aux critères.
                  </td>
                </tr>
              ) : (
                filteredEtablissements.map((etab) => (
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
                          onClick={() => handleOpenEdit(etab)}
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn delete"
                          onClick={() => setDeleteConfirmId(etab.id)}
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

      
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>
                  {editingEtablissement
                    ? "Modifier l'Établissement"
                    : "Créer un Compte Établissement"}
                </h3>
                <p>
                  {editingEtablissement
                    ? "Mettez à jour les informations de cet établissement."
                    : "Renseignez les coordonnées pour créer un nouvel établissement."}
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={handleCloseModal}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                {formError && (
                  <div className="admin-alert error" style={{ margin: 0 }}>
                    {formError}
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
                    onChange={handleFormChange}
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
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>
                      {editingEtablissement
                        ? "Nouveau Mot de passe (optionnel)"
                        : "Mot de passe *"}
                    </label>
                    <input
                      type="password"
                      name="password"
                      required={!editingEtablissement}
                      placeholder={
                        editingEtablissement
                          ? "Laisser vide pour ne pas changer"
                          : "••••••••"
                      }
                      value={formData.password}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Type d'établissement *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
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
                      onChange={handleFormChange}
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
                    onChange={handleFormChange}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Horaire d'ouverture</label>
                    <input
                      type="time"
                      name="horaireOuverture"
                      value={formData.horaireOuverture}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Horaire de fermeture</label>
                    <input
                      type="time"
                      name="horaireFermeture"
                      value={formData.horaireFermeture}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={handleCloseModal}
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
                    : editingEtablissement
                      ? "Enregistrer les modifications"
                      : "Créer l'Établissement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div
          className="admin-modal-overlay"
          onClick={() => setDeleteConfirmId(null)}
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
                onClick={() => setDeleteConfirmId(null)}
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
                action est irréversible et supprimera également les services
                associés.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setDeleteConfirmId(null)}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="button"
                className="admin-primary-btn"
                style={{ background: "var(--admin-danger)" }}
                onClick={() => handleDelete(deleteConfirmId)}
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
