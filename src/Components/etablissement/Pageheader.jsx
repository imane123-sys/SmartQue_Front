import React, { useState } from "react";
import { Calendar, Plus, PhoneForwarded } from "lucide-react";
import { serviceApi } from "../../Api/Service";
import { useAuth } from "../AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEtablissement } from "./EtablissementContext";

const PageHeader = () => {
  return (
    <div className="page-header">
      <div>
        <div className="page-title">
          <h1>Queue Operations</h1>
        </div>

        <p className="page-description">
          Surveillez et gérez le flux des patients d’aujourd’hui à travers tous
          les guichets.
        </p>

        <div className="date-info">
          <Calendar size={16} />
          <span>
            <p>
              <b>{new Date().toLocaleDateString("fr-FR")}</b>
            </p>
          </span>
        </div>
      </div>

      <div className="page-actions"></div>
      <dialog id="service-form">
        <div className="walkin-box">
          <div className="walkin-header">
            <div>
              <h3>Ajouter un service</h3>{" "}
              <p>Créer un nouveau service pour votre établissement.</p>{" "}
            </div>
          </div>
        </div>
      </dialog>

    </div>
  );
};

export default PageHeader;

