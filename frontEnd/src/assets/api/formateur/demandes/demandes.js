import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getDemandes = async (
  groupeId,
  search,
  status,
  dateFrom,
  dateTo
) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const params = {};
    if (groupeId) params.groupe_id = groupeId;
    if (search) params.search = search;
    if (status) params.status = status;
    if (dateFrom) params.date_from = dateFrom;
    if (dateTo) params.date_to = dateTo;

    const res = await axios.get("formateur/demandes", { params });
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

export const downloadDemandeDocument = async (demandeId) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get(`formateur/demandes/download/${demandeId}`, {
      responseType: "blob",
    });
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV =
        error.response?.data?.error || "Erreur lors du téléchargement";
      data.error = errorV;
      return data;
    }
    data.error = "Une erreur s'est produite lors du téléchargement";
    return data;
  }
};
