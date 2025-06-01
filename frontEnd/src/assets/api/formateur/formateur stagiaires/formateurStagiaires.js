import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getFormateurStagiaires = async (groupeId, params = {}) => {
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
      ? `formateur/groupes/${groupeId}/stagiaires`
      : `formateur/groupes/stagiaires`;

    const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
    const res = await axios.get(url);
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
