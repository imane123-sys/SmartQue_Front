import React, { useEffect, useState } from "react";
import { serviceApi } from "../../Api/Service";

function Services() {
  const [services, setServices] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [dureeMoyenne, setDureeMoyenne] = useState("");
  const [etablissementId, setEtablissementId] = useState("");
  const [id, setId] = useState(null);

  const getServices = () => {
    serviceApi.getAll().then((res) => {
      setServices(res.data.content);
    });
  };

  useEffect(() => {
    getServices();
  }, []);

  const save = () => {
    const data = {
      nom,
      description,
      dureeMoyenne: Number(dureeMoyenne),
      etablissementId: Number(etablissementId),
    };

    if (id) {
      serviceApi.update(id, data).then(() => {
        getServices();
        clear();
      });
    } else {
      serviceApi.create(data).then(() => {
        getServices();
        clear();
      });
    }
  };

  const edit = (service) => {
    setId(service.id);
    setNom(service.nom);
    setDescription(service.description);
    setDureeMoyenne(service.dureeMoyenne);
    setEtablissementId(service.etablissementId);
  };

  const remove = (id) => {
    serviceApi.delete(id).then(() => {
      getServices();
    });
  };

  const clear = () => {
    setId(null);
    setNom("");
    setDescription("");
    setDureeMoyenne("");
    setEtablissementId("");
  };

  return (
    <div>
      <h2>Services</h2>

      <input
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Durée moyenne"
        value={dureeMoyenne}
        onChange={(e) => setDureeMoyenne(e.target.value)}
      />

      <input
        type="number"
        placeholder="ID établissement"
        value={etablissementId}
        onChange={(e) => setEtablissementId(e.target.value)}
      />

      <button onClick={save}>{id ? "Modifier" : "Ajouter"}</button>

      {id && <button onClick={clear}>Annuler</button>}

      <hr />

      {services.map((service) => (
        <div key={service.id}>
          <p>
            {service.nom} - {service.dureeMoyenne} min
          </p>

          <button onClick={() => edit(service)}>Modifier</button>

          <button onClick={() => remove(service.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default Services;
