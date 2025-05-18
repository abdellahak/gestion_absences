import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getFilieres = async (id, programmeId) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get(`admin/filieres`);
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
    const res = await axios.delete(`admin/filieres/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.succes = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterFiliere = async (formData) => {
  let data = {
    success: true,
    errors: {
      code: "",
      intitule: "",
    },
    error: "",
  };
  try {
    const res = await axios.post("admin/filieres", formData);
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

export const getFiliere = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`admin/filieres/${id}`);
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
    data.error = "حدت خطا في الخادم";
    return data;
  }
};

export const modifierFiliere = async (formData, id) => {
  let data = {
    success: true,
    errors: {
      code: "",
      intitule: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`admin/filieres/${id}`, formData);
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
};
