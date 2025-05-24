import { useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa6";

import { getSurveillantGroupes } from "../../../../../../assets/api/surveillant/surveillant groupes/surveillantGroups";
import { getSurveillantStagiaires } from "../../../../../../assets/api/surveillant/surveillant stagiaires/SurveillantStagiaires";
export default function SurveillantStagiaireForm({
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
      const res = await getSurveillantGroupes();
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
      const res = await getSurveillantStagiaires();
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
              {/* Téléphone */}
              <div className="mb-4">
                <label
                  htmlFor="telephone"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Téléphone
                </label>
                <input
                  placeholder="Téléphone..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="telephone"
                  id="telephone"
                  value={formData.telephone}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      telephone: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.telephone}
                </p>
              </div>
              {/* Adresse */}
              <div className="mb-4">
                <label
                  htmlFor="adresse"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Adresse
                </label>
                <input
                  placeholder="Adresse..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="adresse"
                  id="adresse"
                  value={formData.adresse}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      adresse: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.adresse}
                </p>
              </div>
              {/* CIN */}
              <div className="mb-4">
                <label htmlFor="CIN" className="mb-1.5 block text-sm font-medium text-gray-700">
                  CIN
                </label>
                <input
                  placeholder="CIN..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="CIN"
                  id="CIN"
                  value={formData.CIN}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      CIN: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.CIN}
                </p>
              </div>
              {/* Sexe */}
              <div className="mb-4">
                <label htmlFor="sexe" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Sexe
                </label>
                <select
                  name="sexe"
                  id="sexe"
                  value={formData.sexe}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      sexe: e.target.value,
                    }))
                  }
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                >
                  <option value="">Sélectionner le sexe</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.sexe}
                </p>
              </div>
              {/* Date de naissance */}
              <div className="mb-4">
                <label
                  htmlFor="date_naissance"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Date de naissance
                </label>
                <input
                  placeholder="Date de naissance..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="date"
                  name="date_naissance"
                  id="date_naissance"
                  value={formData.date_naissance}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      date_naissance: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.date_naissance}
                </p>
              </div>
              {/* Lieu de naissance */}
              <div className="mb-4">
                <label
                  htmlFor="lieu_naissance"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Lieu de naissance
                </label>
                <input
                  placeholder="Lieu de naissance..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="lieu_naissance"
                  id="lieu_naissance"
                  value={formData.lieu_naissance}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      lieu_naissance: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.lieu_naissance}
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