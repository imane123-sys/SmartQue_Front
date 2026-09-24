import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { clientApi } from "../../Api/Client";
import { Edit, Close } from "@mui/icons-material";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephone: yup.string(),
  password: yup.string().required("Le mot de passe est obligatoire"),
  role: yup.string().default("CLIENT"),
});

export default function ModifierClient({ id, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      clientApi.getById(id).then((client) => reset(client));
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await clientApi.update(id, data);
      alert("Client modifié avec succès !");
      onSuccess();
      onClose();   
    } catch (err) {
      alert(err.message || "Erreur lors de la modification");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3><Edit /> Modifier le client #{id}</h3>
        <button type="button" onClick={onClose}><Close /></button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom *</label>
          <input {...register("nom")} />
          <p className="error">{errors.nom?.message}</p>
        </div>

        <div>
          <label>Prénom *</label>
          <input {...register("prenom")} />
          <p className="error">{errors.prenom?.message}</p>
        </div>

        <div>
          <label>Email *</label>
          <input type="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <label>Téléphone</label>
          <input {...register("telephone")} />
        </div>

        <div>
          <label>Mot de passe *</label>
          <input type="password" {...register("password")} />
          <p className="error">{errors.password?.message}</p>
        </div>

        <input type="hidden" {...register("role")} />

        <div className="card-buttons">
          <button type="button" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Modification..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
