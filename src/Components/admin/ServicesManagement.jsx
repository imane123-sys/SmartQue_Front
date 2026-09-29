import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, X, Clock, Building2 } from "lucide-react";
import { serviceApi } from "../../Api/Service";

export default function ServicesManagement({
  services = [],
  etablissements = [],
  onRefresh,
}) {
  const [search, setSearch] = useState("");
  const [filterEtab, setFilterEtab] = useState("ALL");
  const [form, setForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg] = useState("");

  const filteredServices = services.filter((s) => {
    const text =
      `${s.nom || ""} ${s.description || ""} ${s.nomEtablissement || ""}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchEtab =
      filterEtab === "ALL" || String(s.etablissementId) === String(filterEtab);
    return matchSearch && matchEtab;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await serviceApi.update(form.id, form);
      setMsg("Service modifié avec succès !");
    } else {
      await serviceApi.create(form);
      setMsg("Service créé avec succès !");
    }
    setForm(null);
    if (onRefresh) onRefresh();
    setTimeout(() => setMsg(""), 3000);
  };

  const handleDelete = async () => {
    await serviceApi.delete(deleteId);
    setDeleteId(null);
    setMsg("Service supprimé avec succès.");
    if (onRefresh) onRefresh();
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="admin-services-view">
      {msg && <div className="admin-alert success">{msg}</div>}

      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom de service, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <select
            value={filterEtab}
            onChange={(e) => setFilterEtab(e.target.value)}
            className="admin-filter-select"
          >
            <option value="ALL">
              Tous les établissements ({etablissements.length})
            </option>
            {etablissements.map((etab) => (
              <option key={etab.id} value={etab.id}>
                {etab.nom}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={() =>
            setForm({
              nom: "",
              description: "",
              dureeMoyenne: 15,
              etablissementId: etablissements[0]?.id || "",
            })
          }
        >
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
                      <span
                        style={{
                          fontFamily: "monospace",
                          color: "var(--admin-muted-text)",
                        }}
                      >
                        #{service.id}
                      </span>
                    </td>
                    <td>
                      <strong>{service.nom}</strong>
                    </td>
                    <td>
                      <div
                        style={{
                          maxWidth: "260px",
                          color: "var(--admin-muted-text)",
                        }}
                      >
                        {service.description || "Aucune description fournie"}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Clock size={14} color="var(--admin-muted-text)" />
                        <strong>{service.dureeMoyenne || 15} min</strong>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Building2 size={14} color="var(--admin-primary)" />
                        <span>
                          {service.nomEtablissement ||
                            `Établissement #${service.etablissementId}`}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-action-icon-btn edit"
                          onClick={() => setForm(service)}
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn delete"
                          onClick={() => setDeleteId(service.id)}
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

      {form && (
        <div className="admin-modal-overlay" onClick={() => setForm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>{form.id ? "Modifier le Service" : "Nouveau Service"}</h3>
                <p>
                  {form.id
                    ? "Ajustez les informations ou la durée moyenne de la prestation."
                    : "Configurez une nouvelle prestation pour un établissement."}
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setForm(null)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Nom du Service *</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    placeholder="ex: Consultation générale, Dépôt de dossier, Prise de sang..."
                    value={form.nom || ""}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Établissement rattaché *</label>
                  <select
                    name="etablissementId"
                    value={form.etablissementId || ""}
                    onChange={(e) =>
                      setForm({ ...form, etablissementId: e.target.value })
                    }
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
                    value={form.dureeMoyenne || 15}
                    onChange={(e) =>
                      setForm({ ...form, dureeMoyenne: e.target.value })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label>Description du Service</label>
                  <textarea
                    name="description"
                    placeholder="Détails sur les documents nécessaires, consignes pour les usagers..."
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setForm(null)}
                >
                  Annuler
                </button>
                <button type="submit" className="admin-primary-btn">
                  {form.id ? "Mettre à jour le service" : "Créer le service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
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
                onClick={() => setDeleteId(null)}
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
                Êtes-vous sûr de vouloir supprimer définitivement ce service ?
                Les tickets associés à ce service pourraient être impactés.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setDeleteId(null)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="admin-primary-btn"
                style={{ background: "var(--admin-danger)" }}
                onClick={handleDelete}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
