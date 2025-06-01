import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getAbsences = async (groupeId, params = {}) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.per_page) queryParams.append("per_page", params.per_page);
    if (params.search) queryParams.append("search", params.search);

    const baseUrl = groupeId
      ? `formateur/absences/${groupeId}`
      : `formateur/absences`;

    const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
    const res = await axios.get(url);
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

export const supprimerAbsence = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`formateur/absences/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.succes = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};
