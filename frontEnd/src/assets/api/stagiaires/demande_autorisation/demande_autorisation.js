import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getDemandesAutorisation = async () => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const res = await axios.get("stagiaire/demandes");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération des demandes";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterDemandeAutorisation = async (formData) => {
  let data = {
    success: true,
    errors: {},
    error: "",
  };
  try {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value);
      }
    });
    const res = await axios.post("stagiaire/demandes", fd);
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

export const supprimerDemandeAutorisation = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`stagiaire/demandes/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV =
        error.response?.data?.message || error.response?.data?.error;
      data.error = errorV || "Erreur lors de la suppression de la demande";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierDemandeAutorisation = async (formData, id) => {
  let data = { success: true, errors: {}, error: "" };
  try {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "document") {
        if (value && typeof value !== "string") {
          fd.append("document", value);
        }
      } else if (value !== undefined && value !== null) {
        fd.append(key, value);
      }
    });
    const res = await axios.post(`stagiaire/demandes/${id}?_method=PUT`, fd);
    if (res) return data;
  } catch (error) {
    data.success = false;
    if (isAxiosError(error) && error.response?.status === 422) {
      data.errors = error.response.data.errors;
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const download = async (id, file_name) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`stagiaire/download/${id}`, {
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
    data.error = "Ce document n'existe pas";
    return data;
  }
};
