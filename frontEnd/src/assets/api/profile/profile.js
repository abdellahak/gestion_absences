import { axios } from "../axios";
import { isAxiosError } from "axios";

export const getProfile = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`myprofile`);
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


export const updateProfile = async (formData) => {
  let data = {
    success: true,
    errors: {
      email: "",
      telephone: "",
      adresse: "",
      sexe: "",
      date_naissance: "",
      lieu_naissance: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`myprofile`, formData);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      if (error.status == 422) {
        data.errors = error.response.data.errors;
        return data;
      }
      if (error.status == 400) {
        data.server = error.response.data.error;
        return data;
      }
      return data;
    }
    data.server = "Une erreur s'est produite sur le serveur";
    return data;
  }
}
