import { axios } from "../../axios";
export const getAbsences = async (params = {}) => {
  let data = { success: true, data: null, error: "" };
  try {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page);
    if (params.per_page) queryParams.append("per_page", params.per_page);
    if (params.search) queryParams.append("search", params.search);
    if (params.groupe_id) queryParams.append("groupe_id", params.groupe_id);
    if (params.status) queryParams.append("status", params.status);

    const url = queryParams.toString()
      ? `surveillant/absences?${queryParams}`
      : "surveillant/absences";
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
export const download = async (id, file_name) => {
  let data = {
    success: true,
    error: "",
  };

  try {
    const res = await axios.get(`surveillant/justifications/download/${id}`, {
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
export const updateStatus = async (id, status) => {
  let data = { success: true, error: "" };
  try {
    const res = await axios.put(`surveillant/justifications/${id}`, {
      status,
    });
    if (res) {
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la mise à jour du statut";
    return data;
  }
};
