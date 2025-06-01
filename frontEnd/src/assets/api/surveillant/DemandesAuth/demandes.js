import { axios } from "../../axios";
import { isAxiosError } from "axios";

export const getDemandes = async (params = {}) => {
  let data = { success: true, data: null, error: "" };
  try {
    const queryParams = new URLSearchParams();
    
    // Add parameters if they exist
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `surveillant/demandes?${queryString}` : "surveillant/demandes";
    
    const res = await axios.get(url);
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

// Add getGroupes function for group filtering
export const getGroupes = async () => {
  let data = { success: true, data: null, error: "" };
  try {
    const res = await axios.get("admin/groupes");
    if (res) {
      data.data = res.data;
      return data;
    }
  } catch (error) {
    data.success = false;
    data.error = "Erreur lors de la récupération des groupes";
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
export const download = async (id, file_name) => {
    let data = {
        success: true,
        error: "",
    };
    
    try {
        const res = await axios.get(`surveillant/demandes/download/${id}`, {
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
    }