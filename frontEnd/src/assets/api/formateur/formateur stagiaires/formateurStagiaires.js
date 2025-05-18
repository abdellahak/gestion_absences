import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getFormateurStagiaires = async (groupeId) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const url = groupeId
      ? `formateur/groupes/${groupeId}/stagiaires`
      : `formateur/groupes/stagiaires`;
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
