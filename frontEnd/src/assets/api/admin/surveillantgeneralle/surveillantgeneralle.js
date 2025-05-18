import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getSurveillantGenerale = async () => {
    let data = {
        success: true,
        data: null,
        error: "",
    };
    try {
        const res = await axios.get("surveillants");
        if (res) {
            data.data = res.data;
            return data;
        }
    }
    catch (error) {
        data.success = false;
           if (isAxiosError(error)) {
             const errorV = error.response?.data?.error;
             data.error = errorV || "Erreur lors de la récupération des surveillants généraux";
             return data;
           }
           data.error = "Une erreur s'est produite sur le serveur";
           return data;
    }
    };


export const supprimerSurveillantGeneral = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`surveillants/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterSurveillantGeneral = async (formData) => {
  let data = {
    success: true,
    errors: {
      nom: "",
      prenom: "",
      date_recrutement: "",
      email: "",
      identifiant: "",
    },
    error: "",
  };
  try {
    const res = await axios.post("surveillants", formData);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        data.errors = error.response.data.errors;
        return data;
      }
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const getSurveillantGeneral = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`surveillants/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération du surveillant général";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierSurveillantGeneral = async (formData, id) => {
  let data = {
    success: true,
    errors: {
      nom: "",
      prenom: "",
      date_recrutement: "",
      email: "",
      identifiant: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`surveillants/${id}`, formData);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        data.errors = error.response.data.errors;
        return data;
      }
      if (error.response?.status === 400) {
        data.server = error.response.data.error;
        return data;
      }
      return data;
    }
    data.server = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

