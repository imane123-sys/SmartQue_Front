import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, X, Phone, Mail } from "lucide-react";
import { clientApi } from "../../Api/Client";

export default function UtilisateursManagement({ clients = [], onRefresh }) {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [form, setForm] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const list = clients.filter((u) => {
    const text = (
      u.prenom +
      u.nom +
      u.email +
      (u.telephone || "")
    ).toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchRole = filterRole === "ALL" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const save = async (e) => {
    e.preventDefault();
    const data = { ...form, password: form.password || "200585" };
    if (form.id) {
      await clientApi.update(form.id, data);
    } else {
      await clientApi.create(data);
    }
    setForm(null);
    if (onRefresh) onRefresh();
  };

  const remove = async () => {
    await clientApi.delete(deleteId);
    setDeleteId(null);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="admin-utilisateurs-view">
      <div className="admin-toolbar">
        <div className="admin-toolbar-left">
          <div className="admin-search-wrap">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, email, tel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          onClick={() =>
            setForm({
              nom: "",
              prenom: "",
              email: "",
              password: "",
              telephone: "",
              role: "CLIENT",
            })
          }
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
              {list.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                list.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: "monospace",
                          color: "var(--admin-muted-text)",
                        }}
                      >
                        #{u.id}
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
                          {(u.prenom?.[0] || u.nom?.[0] || "U").toUpperCase()}
                        </div>
                        <strong>
                          {u.prenom ? `${u.prenom} ${u.nom}` : u.nom || "—"}
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
                        <span>{u.email || "—"}</span>
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
                        <span>{u.telephone || "—"}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`admin-badge role-${(u.role || "client").toLowerCase()}`}
                      >
                        {u.role === "ADMIN"
                          ? "Administrateur"
                          : u.role === "ETABLISSEMENT"
                            ? "Établissement"
                            : "Client"}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-action-icon-btn edit"
                          onClick={() => setForm(u)}
                          title="Modifier"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="admin-action-icon-btn delete"
                          onClick={() => setDeleteId(u.id)}
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
                <h3>
                  {form.id ? "Modifier l'Utilisateur" : "Nouvel Utilisateur"}
                </h3>
                <p>
                  {form.id
                    ? "Mettez à jour les informations et le rôle de l'utilisateur."
                    : "Créer un nouveau compte utilisateur sur la plateforme."}
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

            <form onSubmit={save}>
              <div className="admin-modal-body">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Youssef, Sara..."
                      value={form.prenom || ""}
                      onChange={(e) =>
                        setForm({ ...form, prenom: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Nom *</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Alami, Benjelloun..."
                      value={form.nom || ""}
                      onChange={(e) =>
                        setForm({ ...form, nom: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="user@example.com"
                      value={form.email || ""}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Téléphone</label>
                    <input
                      type="text"
                      placeholder="0612345678"
                      value={form.telephone || ""}
                      onChange={(e) =>
                        setForm({ ...form, telephone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>
                      {form.id
                        ? "Nouveau Mot de passe (optionnel)"
                        : "Mot de passe *"}
                    </label>
                    <input
                      type="password"
                      required={!form.id}
                      placeholder={
                        form.id ? "Laisser vide si inchangé" : "••••••••"
                      }
                      value={form.password || ""}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Rôle de l'utilisateur *</label>
                    <select
                      value={form.role || "CLIENT"}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
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
                  onClick={() => setForm(null)}
                >
                  Annuler
                </button>
                <button type="submit" className="admin-primary-btn">
                  {form.id
                    ? "Enregistrer les modifications"
                    : "Créer l'utilisateur"}
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
              <h3>Supprimer l'utilisateur</h3>
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
                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Son accès à
                la plateforme sera définitivement révoqué.
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
                onClick={remove}
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
