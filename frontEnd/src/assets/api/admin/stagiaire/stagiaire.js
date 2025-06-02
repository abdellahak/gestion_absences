import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getStagiaires = async (params = {}) => {
  let data = {
    success: true,
    data: null,
    error: "",
  };
  try {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.per_page) queryParams.append("per_page", params.per_page);
    if (params.search) queryParams.append("search", params.search);
    if (params.groupe_id) queryParams.append("groupe_id", params.groupe_id);

    const url = queryParams.toString()
      ? `admin/stagiaires?${queryParams}`
      : "admin/stagiaires";
    const res = await axios.get(url);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération des stagiaires";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const supprimerStagiaire = async (id) => {
  let data = {
    success: true,
    error: "",
  };
  try {
    const res = await axios.delete(`admin/stagiaires/${id}`);
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const ajouterStagiaire = async (formData) => {
  let data = {
    success: true,
    errors: {
      nom: "",
      prenom: "",
      email: "",
      groupe_id: "",
      numero_inscription: "",
    },
    error: "",
  };
  try {
    const res = await axios.post("admin/stagiaires", formData);
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

export const getStagiaire = async (id) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`admin/stagiaires/${id}`);
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      const errorV = error.response?.data?.error;
      data.error = errorV || "Erreur lors de la récupération du stagiaire";
      return data;
    }
    data.error = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const modifierStagiaire = async (formData, id) => {
  let data = {
    success: true,
    errors: {
      groupe_id: "",
      numero_inscription: "",
    },
    server: "",
  };

  try {
    const res = await axios.put(`admin/stagiaires/${id}`, formData);
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
      if (error.response?.status === 400) {
        data.server = error.response.data.error;
        return data;
      }
      return data;
    }
    data.server = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const importStagiaires = async (file) => {
  let data = {
    success: true,
    errors: [],
    message: "",
  };

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("admin/stagiaires/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res) {
      data.message = res.data.message;
      return data;
    }
  } catch (error) {
    data.success = false;
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        data.errors = error.response.data.errors || [];
        data.message = error.response.data.message || "Erreur de validation";
        return data;
      }
      data.message =
        error.response?.data?.message || "Erreur lors de l'importation";
      return data;
    }
    data.message = "Une erreur s'est produite sur le serveur";
    return data;
  }
};

export const downloadTemplate = async () => {
  try {
    const res = await axios.get("admin/stagiaires/template", {
      responseType: "blob",
    });

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "template_stagiaires.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors du téléchargement du template",
    };
  }
};
