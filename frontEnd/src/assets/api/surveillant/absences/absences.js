import { axios } from "../../axios";
export const getAbsences = async () => {
  let data = { success: true, data: null, error: "" };
  try {
    const res = await axios.get("surveillant/absences");
    
    if (res) {
      data.data = res.data;
console.log(res);
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération des absences";
    return data;
  }
};