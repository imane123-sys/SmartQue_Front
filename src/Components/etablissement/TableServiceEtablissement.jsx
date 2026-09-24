import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  Search,
  X,
  BriefcaseBusiness,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useEtablissement } from "./EtablissementContext";
import { useAuth } from "../AuthContext";
import { serviceApi } from "../../Api/Service";
import "./EtablissementDashboard.css";

export default function TableServiceEtablissement() {
  const { user } = useAuth();
  const { servicesEtablissement, handleServicesEtablissement } =
    useEtablissement();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirmService, setDeleteConfirmService] = useState(null);

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    dureeMoyenne: 15,
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 4000);
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      nom: "",
      description: "",
      dureeMoyenne: 15,
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
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingService(null);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nom.trim()) {
      setFormError("Le nom du service est obligatoire.");
      return;
    }
    if (!formData.dureeMoyenne || Number(formData.dureeMoyenne) <= 0) {
      setFormError("La durée moyenne doit être d'au moins 1 minute.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    const payload = {
      nom: formData.nom.trim(),
      description: formData.description ? formData.description.trim() : "",
      dureeMoyenne: Number(formData.dureeMoyenne),
      etablissementId: user?.id,
    };

    try {
      if (editingService) {
        await serviceApi.update(editingService.id, payload);
        showFeedback("success", "Service modifié avec succès !");
      } else {
        await serviceApi.create(payload);
        showFeedback("success", "Service créé avec succès !");
      }
      if (handleServicesEtablissement) {
        handleServicesEtablissement();
      }
      handleCloseModal();
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de l'enregistrement du service."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmService) return;
    setSubmitting(true);
    try {
      await serviceApi.delete(deleteConfirmService.id);
      showFeedback("success", "Service supprimé avec succès.");
      setDeleteConfirmService(null);
      if (handleServicesEtablissement) {
        handleServicesEtablissement();
      }
    } catch (err) {
      showFeedback(
        "error",
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de la suppression du service."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filteredServices = (servicesEtablissement || []).filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      (s.nom || "").toLowerCase().includes(term) ||
      (s.description || "").toLowerCase().includes(term)
    );
  });

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-area">
        <Topbar />

        <main className="content">
          
          <div className="services-page-header">
            <div>
              <div className="services-page-title">
                <div className="services-title-icon">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <h1>Gestion des Services</h1>
                  <p>Consultez, ajoutez, modifiez ou supprimez les services de votre établissement.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Nouveau Service</span>
            </button>
          </div>

          
          {feedback.message && (
            <div className={`services-alert ${feedback.type}`}>
              {feedback.type === "success" ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          
          <div className="services-toolbar">
            <div className="services-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Rechercher un service par nom ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="services-clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="services-count-badge">
              {filteredServices.length}{" "}
              {filteredServices.length > 1 ? "services" : "service"}
            </div>
          </div>

          
          <div className="table-card">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Nom du service</th>
                    <th>Description</th>
                    <th>Durée moyenne</th>
                    <th className="actions-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="services-empty-state">
                        <BriefcaseBusiness size={32} />
                        <p>
                          {searchTerm
                            ? "Aucun service ne correspond à votre recherche."
                            : "Aucun service enregistré pour le moment."}
                        </p>
                        {!searchTerm && (
                          <button
                            type="button"
                            className="secondary-button"
                            onClick={handleOpenAdd}
                          >
                            <Plus size={14} />
                            <span>Ajouter un premier service</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <span className="service-name-text">{s.nom}</span>
                        </td>
                        <td>
                          <span className="service-desc-text">
                            {s.description || (
                              <span className="muted-dash">—</span>
                            )}
                          </span>
                        </td>
                        <td>
                          <span className="duration-badge">
                            <Clock size={12} />
                            <span>{s.dureeMoyenne || 15} min</span>
                          </span>
                        </td>
                        <td className="actions-cell">
                          <div className="service-row-actions">
                            <button
                              type="button"
                              className="service-action-btn edit"
                              onClick={() => handleOpenEdit(s)}
                              title="Modifier ce service"
                            >
                              <Pencil size={14} />
                              <span>Modifier</span>
                            </button>
                            <button
                              type="button"
                              className="service-action-btn delete"
                              onClick={() => setDeleteConfirmService(s)}
                              title="Supprimer ce service"
                            >
                              <Trash2 size={14} />
                              <span>Supprimer</span>
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
            <div className="services-modal-backdrop" onClick={handleCloseModal}>
              <div
                className="services-modal-card"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="services-modal-header">
                  <div>
                    <h3>
                      {editingService
                        ? "Modifier le service"
                        : "Nouveau service"}
                    </h3>
                    <p>
                      {editingService
                        ? "Mettez à jour les informations du service."
                        : "Remplissez les détails pour créer un nouveau service."}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="services-modal-close"
                    onClick={handleCloseModal}
                  >
                    <X size={18} />
                  </button>
                </div>

                {formError && (
                  <div className="services-modal-error">
                    <AlertCircle size={15} />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="services-form">
                  <div className="services-form-field">
                    <label>Nom du service *</label>
                    <input
                      type="text"
                      placeholder="Ex: Consultation Médecine Générale"
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      required
                      autoFocus
                    />
                  </div>

                  <div className="services-form-field">
                    <label>Description</label>
                    <textarea
                      placeholder="Description de la prestation proposée..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="services-form-field">
                    <label>Durée moyenne estimée (minutes) *</label>
                    <div className="duration-input-wrapper">
                      <Clock size={16} />
                      <input
                        type="number"
                        min="1"
                        max="300"
                        placeholder="Ex: 20"
                        value={formData.dureeMoyenne}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dureeMoyenne: e.target.value,
                          })
                        }
                        required
                      />
                      <span className="duration-unit">minutes</span>
                    </div>
                  </div>

                  <div className="services-modal-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={handleCloseModal}
                      disabled={submitting}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="primary-button"
                      disabled={submitting}
                    >
                      {submitting
                        ? "Enregistrement..."
                        : editingService
                        ? "Enregistrer les modifications"
                        : "Créer le service"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          
          {deleteConfirmService && (
            <div
              className="services-modal-backdrop"
              onClick={() => setDeleteConfirmService(null)}
            >
              <div
                className="services-modal-card confirm-delete"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="delete-confirm-icon">
                  <Trash2 size={24} />
                </div>
                <h3>Confirmer la suppression</h3>
                <p>
                  Êtes-vous sûr de vouloir supprimer le service{" "}
                  <strong>"{deleteConfirmService.nom}"</strong> ? Cette action
                  est irréversible.
                </p>
                <div className="services-modal-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setDeleteConfirmService(null)}
                    disabled={submitting}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={handleDelete}
                    disabled={submitting}
                  >
                    {submitting ? "Suppression..." : "Supprimer"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
