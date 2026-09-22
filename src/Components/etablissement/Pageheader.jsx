import React, { useState } from "react";
import { Calendar, Plus, PhoneForwarded } from "lucide-react";
import { serviceApi } from "../../Api/Service";
import { useAuth } from "../AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEtablissement } from "./EtablissementContext";
const schema = yup.object({
  nom: yup.string().required("Le nom du service est obligatoire"),

  description: yup.string(),

  dureeMoyenne: yup
    .number()
    .typeError("La durée doit être un nombre")
    .min(1, "La durée doit être au moins de 1 minute")
    .required("La durée est obligatoire"),
});

const PageHeader = () => {
  const { user } = useAuth();

  const [createdService, setCreatedService] = useState({});
  const [erreur, setErreur] = useState("");
  const { servicesEtablissement, handleServicesEtablissement } =
    useEtablissement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createService = (data) => {
    const service = {
      nom: data.nom,
      description: data.description,
      dureeMoyenne: data.dureeMoyenne,
      etablissementId: user.id,
    };

    serviceApi
      .create(service)
      .then((res) => {
        setCreatedService(res.data);
        handleServicesEtablissement();

        reset();
      })
      .catch((err) => {
        setErreur(err);
      });
  };

  return (
    <div className="page-header">
      <div>
        <div className="page-title">
          <h1>Queue Operations</h1>
          <span className="live-badge">Live</span>
        </div>

        <p className="page-description">
          Monitor and manage today's patient flow across all counters.
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

      <div className="page-actions">
        <button
          className="secondary-button"
          onClick={() => document.getElementById("service-form").showModal()}
        >
          <Plus size={18} />
          Ajouter Service
        </button>
      </div>
      <dialog id="service-form">
        <div className="walkin-box">
          <div className="walkin-header">
            <div>
              <h3>Ajouter un service</h3>{" "}
              <p>Créer un nouveau service pour votre établissement.</p>{" "}
            </div>
          </div>
          <form className="walkin-form" onSubmit={handleSubmit(createService)}>
            <div className="form-group">
              <label>Nom du service</label>
              <input
                type="text"
                {...register("nom")}
                placeholder="Ex: Consultation"
              />
              {errors.nom && (
                <p className="service-error">{errors.nom.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                {...register("description")}
                placeholder="Description du service"
              />
              {errors.description && (
                <p className="service-error">{errors.description.message}</p>
              )}
            </div>
            <div className="form-group">
              <label>Durée moyenne</label>
              <input
                type="number"
                {...register("dureeMoyenne")}
                placeholder="Ex: 30"
              />
              {errors.dureeMoyenne && (
                <p className="service-error">{errors.dureeMoyenne.message}</p>
              )}
            </div>
            <div className="walkin-actions">
              <button type="button" className="secondary-button">
                Annuler
              </button>
              <button type="submit" className="primary-button">
                {" "}
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PageHeader;
