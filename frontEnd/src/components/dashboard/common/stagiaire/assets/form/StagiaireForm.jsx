import { useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa6";
import { getGroupes } from "../../../../../../assets/api/admin/groupe/groupe";
import {getStagiaires} from "../../../../../../assets/api/admin/stagiaire/stagiaire";
export default function StagiaireForm({
  handleSubmit,
  errors,
  formData,
  setFormData,
  setErrors,
  update,
  loading,
}) {
  const [groupes, setGroupes] = useState([]);
  const [loadingGroupes, setLoadingGroupes] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchGroupes = async () => {
      setLoadingGroupes(true);
      const res = await getGroupes();
      setLoadingGroupes(false);
      if (res && res.success) {
        setGroupes(res.data);
      }
    };
    fetchGroupes();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      const res = await getStagiaires();
      setLoadingUsers(false);
      if (res && res.success) setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {update ? "Modifier stagiaire" : "Ajouter un stagiaire"}
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Nom */}
              <div className="mb-4">
                <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  placeholder="Nom..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      nom: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.nom}
                </p>
              </div>
              {/* Prénom */}
              <div className="mb-4">
                <label htmlFor="prenom" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  placeholder="Prénom..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={formData.prenom}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      prenom: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.prenom}
                </p>
              </div>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  placeholder="Email..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.email}
                </p>
              </div>
              {/* Numéro d'inscription */}
              <div className="mb-4">
                <label
                  htmlFor="numero_inscription"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Numéro d'inscription
                </label>
                <input
                  placeholder="Numéro d'inscription..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="numero_inscription"
                  id="numero_inscription"
                  value={formData.numero_inscription}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      numero_inscription: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.numero_inscription}
                </p>
              </div>
              {/* Groupe */}
              <div className="mb-4">
                <label
                  htmlFor="groupe_id"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Groupe
                </label>
                <select
                  name="groupe_id"
                  id="groupe_id"
                  value={formData.groupe_id}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      groupe_id: e.target.value,
                    }))
                  }
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                >
                  {loadingGroupes ? (
                    <option value="">Chargement...</option>
                  ) : (
                    <>
                      <option value="">Sélectionner un groupe</option>
                      {groupes.map(groupe => (
                        <option key={groupe.id} value={groupe.id}>
                          {groupe.intitule}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.groupe_id}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium transition-colors rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {update ? <FaPen /> : <FaPlus />}
            {update ? "modifier le stagiaire" : "ajouter le stagiaire"}
          </button>
        </div>
      </div>
    </>
  );
}