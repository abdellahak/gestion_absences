import { axios } from "../../axios";
import { isAxiosError } from "axios";

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
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};