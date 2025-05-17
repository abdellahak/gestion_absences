import { axios } from "../axios";
import { isAxiosError } from "axios";

export const getFilieres = async (id, programmeId) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get(`filieres`);
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

export const supprimerFiliere = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`filieres/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.succes = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};
