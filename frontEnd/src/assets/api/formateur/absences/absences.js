import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getAbsences = async (id, programmeId) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get(`formateur/absences`);
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

export const ajouterAbsence = async (formData) => {
  let data = {
    success: true,
    errors: {
      stagiaires: "",
      heure_debut: "",
      heure_fin: "",
    },
    error: "",
  };
  try {
    const res = await axios.post("formateur/absences", formData);
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
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};