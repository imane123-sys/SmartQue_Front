import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { etablissementApi } from "../../Api/Etablissement";
import { useEtablissement } from "./EtablissementContext";

export default function QueueTable({ tickets }) {
  const { ticketEtablissement } = useEtablissement();
  const list = tickets || ticketEtablissement;

  useEffect(() => {});
  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Numéro Ticket</th>
              <th>Nom du client</th>
              <th>nom de service</th>
              <th>nom de l'établissement</th>
              <th>Temps Estimé</th>
              <th>status</th>
              <th>Date de création</th>
            </tr>
          </thead>

          <tbody>
            {list.map((t) => (
              <tr key={t.id}>
                <td>
                  <span className="ticket-id">{t.numero}</span>
                </td>

                <td>{t.nomClient}</td>
                <td>{t.nomService}</td>
                <td>{t.nomEtablissement}</td>
                <td>{t.tempsEstime}</td>
                <td>{t.statut}</td>
                <td>{t.dateCreation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
