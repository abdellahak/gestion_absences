import { axios } from "../../axios";

export const getAvertissements = async () => {
  let data = { success: true, data: null, error: "" };
  try {
    const res = await axios.get("stagiaire/avertissements");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération des avertissements";
    return data;
  }
};