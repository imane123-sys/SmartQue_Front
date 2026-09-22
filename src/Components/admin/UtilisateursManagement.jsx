import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Users,
  Shield,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { clientApi } from "../../Api/Client";

export default function UtilisateursManagement({ clients = [], onRefresh }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const initialFormData = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    telephone: "",
    role: "CLIENT",
  };

  const [formData, setFormData] = useState(initialFormData);

  const filteredUsers = clients.filter((u) => {
    const fullName = `${u.prenom || ""} ${u.nom || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.telephone || "").includes(searchTerm);
    const matchesRole =
      filterRole === "ALL" ||
      String(u.role).toUpperCase() === filterRole.toUpperCase();
    return matchesSearch && matchesRole;
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData(initialFormData);
    setFormError("");
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      nom: user.nom || "",
      prenom: user.prenom || "",
      email: user.email || "",
      password: "",
      telephone: user.telephone || "",
      role: user.role || "CLIENT",
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
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
      if (editingUser) {
        await clientApi.update(editingUser.id, {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          password: formData.password || "200585",
          role: formData.role,
        });
        setFormSuccess("Utilisateur mis à jour avec succès !");
      } else {
        await clientApi.create({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password || "200585",
          telephone: formData.telephone,
          role: formData.role,
        });
        setFormSuccess("Nouvel utilisateur créé avec succès !");
      }

      handleCloseModal();
      if (onRefresh) onRefresh();
      setTimeout(() => setFormSuccess(""), 4000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de l'enregistrement de l'utilisateur.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await clientApi.delete(id);
      setDeleteConfirmId(null);
      setFormSuccess("Utilisateur supprimé avec succès.");
      if (onRefresh) onRefresh();
      setTimeout(() => setFormSuccess(""), 4000);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Erreur lors de la suppression de l'utilisateur.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const r = String(role).toUpperCase();
    if (r === "ADMIN") {
      return <span className="admin-badge role-admin">Administrateur</span>;
    }
    if (r === "ETABLISSEMENT") {
      return (
        <span className="admin-badge role-etablissement">Établissement</span>
      );
    }
    return <span className="admin-badge role-client">Client</span>;
  };

  return (
    <div className="admin-utilisateurs-view">
      {formSuccess && <div className="admin-alert success">{formSuccess}</div>}
      {formError && <div className="admin-alert error">{formError}</div>}

      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, email, tel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="admin-filter-select"
          >
            <option value="ALL">Tous les rôles ({clients.length})</option>
            <option value="CLIENT">Clients</option>
            <option value="ETABLISSEMENT">Établissements</option>
            <option value="ADMIN">Administrateurs</option>
          </select>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={handleOpenAdd}
        >
          <Plus size={16} />
          <span>Ajouter un Utilisateur</span>
        </button>
      </div>

      
      <div className="admin-table-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom & Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Rôle</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: "monospace",
                          color: "var(--admin-muted-text)",
                        }}
                      >
                        #{user.id}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {(
                            user.prenom?.[0] ||
                            user.nom?.[0] ||
                            "U"
                          ).toUpperCase()}
                        </div>
                        <strong>
                          {user.prenom
                            ? `${user.prenom} ${user.nom}`
                            : user.nom || "—"}
                        </strong>
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
                        <Mail size={13} color="var(--admin-muted-text)" />
                        <span>{user.email || "—"}</span>
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
                        <Phone size={13} color="var(--admin-muted-text)" />
                        <span>{user.telephone || "—"}</span>
                      </div>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-action-icon-btn edit"
                          onClick={() => handleOpenEdit(user)}
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn delete"
                          onClick={() => setDeleteConfirmId(user.id)}
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
                  {editingUser
                    ? "Modifier l'Utilisateur"
                    : "Nouvel Utilisateur"}
                </h3>
                <p>
                  {editingUser
                    ? "Mettez à jour les informations et le rôle de l'utilisateur."
                    : "Créer un nouveau compte utilisateur sur la plateforme."}
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

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      placeholder="ex: Youssef, Sara..."
                      value={formData.prenom}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      name="nom"
                      required
                      placeholder="ex: Alami, Benjelloun..."
                      value={formData.nom}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Téléphone</label>
                    <input
                      type="text"
                      name="telephone"
                      placeholder="0612345678"
                      value={formData.telephone}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>
                      {editingUser
                        ? "Nouveau Mot de passe (optionnel)"
                        : "Mot de passe *"}
                    </label>
                    <input
                      type="password"
                      name="password"
                      required={!editingUser}
                      placeholder={
                        editingUser ? "Laisser vide si inchangé" : "••••••••"
                      }
                      value={formData.password}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Rôle de l'utilisateur *</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="CLIENT">
                        Client (Visiteur / Patient)
                      </option>
                      <option value="ETABLISSEMENT">Agent Établissement</option>
                      <option value="ADMIN">Administrateur Plateforme</option>
                    </select>
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
                    : editingUser
                      ? "Enregistrer les modifications"
                      : "Créer l'utilisateur"}
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
              <h3>Supprimer l'utilisateur</h3>
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
                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Son accès à
                la plateforme sera définitivement révoqué.
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
