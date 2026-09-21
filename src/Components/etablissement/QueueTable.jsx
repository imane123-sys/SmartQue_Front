import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { etablissementApi } from "../../Api/Etablissement";

export default function QueueTable() {
  const { user } = useAuth();
  const [ticketEtablissement, setTicketEtablissement] = useState([]);
  const [erreur, setErreur] = useState("");
  const handleTicketsEtablissement = () => {
    if (!user) return;

    etablissementApi
      .getTicketsEtablissement(user.id)
      .then((res) => {
        setTicketEtablissement(res.data.content);
        console.log(res.data);
      })
      .catch((err) => setErreur(err));
  };
  useEffect(() => {
    handleTicketsEtablissement();
  }, [user?.id]);
  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="checkbox-column">
                <input type="checkbox" />
              </th>

              <th>Numéro Ticket</th>
              <th>Nom du client</th>
              <th>nom de service</th>
              <th>nom de l'établissement</th>
              <th>Temps Estimé</th>
              <th>status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {ticketEtablissement.map((t) => (
              <tr key={t.id}>
                <td>
                  <input type="checkbox" />
                </td>

                <td>
                  <span className="ticket-id">{t.numero}</span>
                </td>

                <td>{t.nomClient}</td>
                <td>{t.nomService}</td>
                <td>{t.tempsEstime}</td>
                <td>{t.statut}</td>

                <td className="actions-cell">
                  <button className="table-action">Call</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div>
          Showing <strong>4</strong> of <strong>4</strong> waiting visitors
        </div>

        <div className="pagination">
          <button disabled>Previous</button>

          <span>Page 1 of 1</span>

          <button disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
