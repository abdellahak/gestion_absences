import { axios } from "../../axios";
import { isAxiosError } from "axios"; 
export const getFormateurs = async () => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get("formateurs");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération des formateurs";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const supprimerFormateur = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`formateurs/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterFormateur = async (formData) => {
  let data = {
    success: true,
    errors: {
      user_id : "",
      date_recrutement: "",
      
    },
    error: "",
  };
  try {
    const res = await axios.post("formateurs", formData);
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

export const getFormateur = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`formateurs/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération du formateur";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierFromateur = async (formData, id) => {
  let data = {
    success: true,
    errors: {
     user_id : "",
      date_recrutement: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`formateurs/${id}`, formData);
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
