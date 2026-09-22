import React, { useEffect, useState } from "react";
import { useEtablissement } from "./EtablissementContext";

export default function TableServiceEtablissement() {
  const { servicesEtablissement } = useEtablissement();
  useEffect(() => {});
  console.log(servicesEtablissement.dureeMoyenne);

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="checkbox-column">
                <input type="checkbox" />
              </th>

              <th>Nom service</th>
              <th>Description</th>
              <th>la durée moyenne</th>
              <th>nom de l'établissement</th>

              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {servicesEtablissement.map((s) => (
              <tr key={s.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <span className="ticket-id">{s.nom}</span>
                </td>
                <td>{s.description}</td>
                <td>{s.dureeMoyenne}</td>
                <td>{s.nomEtablissement}</td>
                <td className="actions-cell">
                  <button className="table-action">Call</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
