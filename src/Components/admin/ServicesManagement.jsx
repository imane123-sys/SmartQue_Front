import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Layers,
  Building2,
  Clock,
  FileText,
} from "lucide-react";
import { serviceApi } from "../../Api/Service";

export default function ServicesManagement({
  services = [],
  etablissements = [],
  onRefresh,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEtablissement, setFilterEtablissement] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const initialFormData = {
    nom: "",
    description: "",
    dureeMoyenne: 15,
    etablissementId: etablissements[0]?.id || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      (s.nom || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.nomEtablissement || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEtab =
      filterEtablissement === "ALL" ||
      String(s.etablissementId) === String(filterEtablissement);
    return matchesSearch && matchesEtab;
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      nom: "",
      description: "",
      dureeMoyenne: 15,
      etablissementId: etablissements[0]?.id || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setFormData({
      nom: service.nom || "",
      description: service.description || "",
      dureeMoyenne: service.dureeMoyenne || 15,
      etablissementId: service.etablissementId || "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingService(null);
    setFormError("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "dureeMoyenne" || name === "etablissementId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    if (!formData.etablissementId) {
      setFormError("Veuillez sélectionner un établissement pour ce service.");
      setLoading(false);
      return;
    }

    try {
      if (editingService) {
        await serviceApi.update(editingService.id, {
          nom: formData.nom,
          description: formData.description,
          dureeMoyenne: formData.dureeMoyenne,
          etablissementId: formData.etablissementId,
        });
        setFormSuccess("Service modifié avec succès !");
      } else {
        await serviceApi.create({
          nom: formData.nom,
          description: formData.description,
          dureeMoyenne: formData.dureeMoyenne,
          etablissementId: formData.etablissementId,
        });
        setFormSuccess("Service créé avec succès !");
      }

      handleCloseModal();
      if (onRefresh) onRefresh();
      setTimeout(() => setFormSuccess(""), 4000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de l'enregistrement du service."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await serviceApi.delete(id);
      setDeleteConfirmId(null);
      setFormSuccess("Service supprimé avec succès.");
      if (onRefresh) onRefresh();
      setTimeout(() => setFormSuccess(""), 4000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de la suppression du service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-services-view">
      {formSuccess && <div className="admin-alert success">{formSuccess}</div>}
      {formError && <div className="admin-alert error">{formError}</div>}

      
      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom de service, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <select
            value={filterEtablissement}
            onChange={(e) => setFilterEtablissement(e.target.value)}
            className="admin-filter-select"
          >
            <option value="ALL">Tous les établissements ({etablissements.length})</option>
            {etablissements.map((etab) => (
              <option key={etab.id} value={etab.id}>
                {etab.nom}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="admin-primary-btn" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Ajouter un Service</span>
        </button>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom du Service</th>
                <th>Description</th>
                <th>Durée Moyenne</th>
                <th>Établissement Associé</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    Aucun service trouvé.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <span style={{ fontFamily: "monospace", color: "var(--admin-muted-text)" }}>
                        #{service.id}
                      </span>
                    </td>
                    <td>
                      <strong>{service.nom}</strong>
                    </td>
                    <td>
                      <div style={{ maxWidth: "260px", color: "var(--admin-muted-text)" }}>
                        {service.description || "Aucune description fournie"}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Clock size={14} color="var(--admin-muted-text)" />
                        <strong>{service.dureeMoyenne || 15} min</strong>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Building2 size={14} color="var(--admin-primary)" />
                        <span>{service.nomEtablissement || `Établissement #${service.etablissementId}`}</span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-action-icon-btn edit"
                          onClick={() => handleOpenEdit(service)}
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn delete"
                          onClick={() => setDeleteConfirmId(service.id)}
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
                <h3>{editingService ? "Modifier le Service" : "Nouveau Service"}</h3>
                <p>
                  {editingService
                    ? "Ajustez les informations ou la durée moyenne de la prestation."
                    : "Configurez une nouvelle prestation pour un établissement."}
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
                  <label>Nom du Service *</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    placeholder="ex: Consultation générale, Dépôt de dossier, Prise de sang..."
                    value={formData.nom}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Établissement rattaché *</label>
                  <select
                    name="etablissementId"
                    value={formData.etablissementId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">-- Choisir un établissement --</option>
                    {etablissements.map((etab) => (
                      <option key={etab.id} value={etab.id}>
                        {etab.nom} ({etab.type || "Établissement"})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Durée moyenne par client (minutes) *</label>
                  <input
                    type="number"
                    name="dureeMoyenne"
                    min="1"
                    max="180"
                    required
                    value={formData.dureeMoyenne}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description du Service</label>
                  <textarea
                    name="description"
                    placeholder="Détails sur les documents nécessaires, consignes pour les usagers..."
                    value={formData.description}
                    onChange={handleFormChange}
                  />
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
                    : editingService
                    ? "Mettre à jour le service"
                    : "Créer le service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {deleteConfirmId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div
            className="admin-modal"
            style={{ maxWidth: "440px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>Supprimer le service</h3>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setDeleteConfirmId(null)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ fontSize: "13px", color: "var(--admin-foreground)", lineHeight: "1.5" }}>
                Êtes-vous sûr de vouloir supprimer définitivement ce service ? Les tickets associés à
                ce service pourraient être impactés.
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
                {loading ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
