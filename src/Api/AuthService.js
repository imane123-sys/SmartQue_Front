import connexion from "./Connexion";
export const login = async (data) => {
  return connexion.post("/api/auth/login", 
    data
    
  );
};
export const registerClient = async (data) => {
  const response = await connexion.post("/api/auth/register/client", 
   data
  );

  return response;
};
export const registerEtablissement = async (data) => {
  const response = await connexion.post("/api/auth/register/etablissement", 
   data
  );

  return response;
};
