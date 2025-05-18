import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getStagiaires = async () => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get("admin/stagiaires");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération des stagiaires";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const supprimerStagiaire = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`admin/stagiaires/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterStagiaire = async (formData) => {
  let data = {
    success: true,
    errors: {
      groupe_id: "",
      numero_inscription: "",
    },
    error: "",
  };
  try {
    const res = await axios.post("admin/stagiaires", formData);
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

export const getStagiaire = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`admin/stagiaires/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération du stagiaire";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierStagiaire = async (formData, id) => {
  let data = {
    success: true,
    errors: {
      groupe_id: "",
      numero_inscription: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`admin/stagiaires/${id}`, formData);
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
