import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getDemandes = async () => {
  let data = { success: true, data: null, error: "" };
  try {
    const res = await axios.get("surveillant/demandes");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération des demandes";
    return data;
  }
}
export const updateStatus = async (id, status) => {
  let data = { success: true, error: "" };
  try {
    const res = await axios.put(`surveillant/demandes/${id}`, {
      status,
    });
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      data.error = error.response?.data?.message || "Erreur lors de la mise à jour du statut";
    } else {
      data.error = "Erreur lors de la mise à jour du statut";
    }
    return data;
  }
}