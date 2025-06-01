import { axios } from "../../axios";
export const getAbsences = async (params = {}) => {
  let data = { success: true, data: null, error: "" };
  try {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.per_page) queryParams.append("per_page", params.per_page);
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status", params.status);

    const url = queryParams.toString()
      ? `stagiaire/absences?${queryParams}`
      : "stagiaire/absences";
    const res = await axios.get(url);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération des absences";
    return data;
  }
};
