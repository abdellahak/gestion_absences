import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getJustifications = async () => {
  let data = { success: true, data: null, error: "" };
  try {
    const res = await axios.get("stagiaire/justifications");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération des justifications";
    return data;
  }
};

export const ajouterJustification = async (formData) => {
  let data = { success: true, errors: {}, error: "" };
  try {
    const res = await axios.post("stagiaire/justifications", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res) return data;
  } catch (error) {
    data.success = false;
    if (isAxiosError(error) && error.response?.status === 422) {
      data.errors = error.response.data.errors;
      return data;
    }
    data.error = "Erreur lors de l'ajout de la justification";
    return data;
  }
};

export const modifierJustification = async (formData, id) => {
  let data = { success: true, errors: {}, error: "" };
  try {
    const res = await axios.post(`stagiaire/justifications/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res) return data;
  } catch (error) {
    data.success = false;
    if (isAxiosError(error) && error.response?.status === 422) {
      data.errors = error.response.data.errors;
      return data;
    }
    data.error = "Erreur lors de la modification de la justification";
    return data;
  }
};

export const supprimerJustification = async (id) => {
  let data = { success: true, error: "" };
  try {
    const res = await axios.delete(`stagiaire/justifications/${id}`);
    if (res) return data;
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la suppression de la justification";
    return data;
  }
};

export const getJustification = async (id) => {
  let data = { success: true, data: null, error: "" };
  try {
    const res = await axios.get(`stagiaire/justifications/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération de la justification";
    return data;
  }
};



export const download= async (id, file_name) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`stagiaire/justifications/download/${id}`, {
      responseType: "blob",
    });
    if (res) {
      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: res.headers["content-type"] || "application/octet-stream",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};