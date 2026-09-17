import React, { useEffect, useState } from "react";
import { clientApi } from "../../Api/Client";
import { Close } from "@mui/icons-material";

export default function ClientDetail({ id, onClose }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (id) {
      clientApi.getById(id).then((data) => setClient(data));
    }
  }, [id]);

  if (!client) {
    return <p>Chargement des détails...</p>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Détails du client #{id}</h3>
        <button type="button" onClick={onClose}><Close /></button>
      </div>

      <p><strong>Nom :</strong> {client.nom}</p>
      <p><strong>Prénom :</strong> {client.prenom}</p>
      <p><strong>Email :</strong> {client.email}</p>
      <p><strong>Téléphone :</strong> {client.telephone || "—"}</p>
      <p><strong>Rôle :</strong> {client.role || "CLIENT"}</p>

      <div className="card-buttons">
        <button type="button" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}
