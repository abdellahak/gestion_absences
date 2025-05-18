import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getSurveillantGroupes = async () => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get(`surveillant/groupes`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response.data.error;
      data.error = errorV;
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};
export const ajouterSurveillantGroupe = async (formData) => {
  let data = {
    success: true,
    errors: {
      intitule: "",
      code: "",
      filiere_id: "",
    },
    error: "",
  };
  try {
    const res = await axios.post("surveillant/groupes", formData);
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

export const getSurveillantGroupe = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`surveillant/groupes/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response.data.error;
      data.error = errorV;
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierSurveillantGroupe = async (formData, id) => {
  let data = {
    success: true,
    errors: {
      intitule: "",
      code: "",
      filiere_id: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`surveillant/groupes/${id}`, formData);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      if (error.status == 422) {
        data.errors = error.response.data.errors;
        return data;
      }
      if (error.status == 400) {
        data.server = error.response.data.error;
        return data;
      }
      return data;
    }
    data.server = "Une erreur s'est produite sur le serveur";
    return data;
  }
};
