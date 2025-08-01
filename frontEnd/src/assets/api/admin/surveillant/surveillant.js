import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getSurveillants = async () => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get("admin/surveillants");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error =
        errorV || "Erreur lors de la récupération des surveillants généraux";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const supprimerSurveillant = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`admin/surveillants/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterSurveillant = async (formData) => {
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
    const res = await axios.post("admin/surveillants", formData);
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

export const getSurveillant = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.get(`admin/surveillants/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error =
        errorV || "Erreur lors de la récupération du surveillant général";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierSurveillant = async (formData, id) => {
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
    const res = await axios.put(`admin/surveillants/${id}`, formData);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    console.error(error);
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
