import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { clientApi } from "../../Api/Client";
import { PersonAdd, Close } from "@mui/icons-material";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephone: yup.string(),
  password: yup.string().required("Le mot de passe est obligatoire"),
});

export default function AjoutClient({ onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await clientApi.create(data);
      alert("Client créé avec succès !");
      onSuccess();
      onClose();   
    } catch (err) {
      alert(err.message || "Erreur lors de la création");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3><PersonAdd /> Ajouter un client</h3>
        <button type="button" onClick={onClose}><Close /></button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom *</label>
          <input {...register("nom")} placeholder="Dupont" />
          <p className="error">{errors.nom?.message}</p>
        </div>

        <div>
          <label>Prénom *</label>
          <input {...register("prenom")} placeholder="Jean" />
          <p className="error">{errors.prenom?.message}</p>
        </div>

        <div>
          <label>Email *</label>
          <input type="email" {...register("email")} placeholder="jean@example.com" />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <label>Téléphone</label>
          <input {...register("telephone")} placeholder="0612345678" />
        </div>

        <div>
          <label>Mot de passe *</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div className="card-buttons">
          <button type="button" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Créer le client"}
          </button>
        </div>
      </form>
    </div>
  );
}
