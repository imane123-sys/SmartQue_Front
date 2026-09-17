import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clientApi } from "../../Api/Client";

import AjoutClient from "./AjoutClient";
import ClientDetail from "./ClientDetail";
import ModifierClient from "./ModifierClient";

import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";

import "./Clients.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const chargerClients = async () => {
    try {
      const data = await clientApi.getAll(page, 5);
      setClients(data.content || data);
    } catch (err) {
      console.error("Erreur lors du chargement des clients :", err);
    }
  };

  useEffect(() => {
    chargerClients();
  }, [page]);

  const supprimerClient = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      try {
        await clientApi.delete(id);
        alert("Client supprimé avec succès !");
        chargerClients();
      } catch (err) {
        alert(err.message || "Erreur lors de la suppression");
      }
    }
  };

  const clientsFiltres = clients.filter((client) => {
    const texte =
      `${client.nom || ""} ${client.prenom || ""} ${client.email || ""} ${client.telephone || ""}`.toLowerCase();
    return texte.includes(search.toLowerCase());
  });

  return (
    <div className="clients-container">
      <header className="clients-header">
        <Link to="/" className="brand">
          SmartQueue
        </Link>
        <Link to="/login">Déconnexion</Link>
      </header>

      <h2>Gestion des Clients</h2>

      <div className="clients-toolbar">
        <div className="search-box">
          <Search />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={() => setModal("ajout")}>
          <Add /> Ajouter un client
        </button>
      </div>

      {modal === "ajout" && (
        <AjoutClient
          onClose={() => setModal(null)}
          onSuccess={chargerClients}
        />
      )}

      {modal === "detail" && (
        <ClientDetail id={selectedId} onClose={() => setModal(null)} />
      )}

      {modal === "modifier" && (
        <ModifierClient
          id={selectedId}
          onClose={() => setModal(null)}
          onSuccess={chargerClients}
        />
      )}

      <table className="clients-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsFiltres.length > 0 ? (
            clientsFiltres.map((client) => (
              <tr key={client.id}>
                <td>
                  {client.nom} {client.prenom}
                </td>
                <td>{client.email}</td>
                <td>{client.telephone || "—"}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedId(client.id);
                      setModal("detail");
                    }}
                    title="Détails"
                  >
                    <Visibility />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedId(client.id);
                      setModal("modifier");
                    }}
                    title="Modifier"
                  >
                    <Edit />
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => supprimerClient(client.id)}
                    title="Supprimer"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Aucun client trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          <NavigateBefore /> Précédent
        </button>

        <span>Page {page + 1}</span>

        <button onClick={() => setPage(page + 1)}>
          Suivant <NavigateNext />
        </button>
      </div>
    </div>
  );
}
