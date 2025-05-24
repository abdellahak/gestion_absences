import { useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa6";

export default function SurveillantForm({
  handleSubmit,
  errors,
  formData,
  setFormData,
  setErrors,
  update,
  loading,
}) {

  return (
    <>
      <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {update ? "Modifier surveillant" : "Ajouter un surveillant"}
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
             
             <div className="mb-4">
                <label
                  htmlFor="intitule"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    nom 
                </label>
                <div className="relative">
                  <div className="flex flex-col gap-1 w-full">
                    <input
                      placeholder="Nom de l'utilisateur..."
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      type="text"
                      name="nom"
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          nom: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-red-500 text-md break-words h-[20px]">
                      {errors.nom}
                    </p>
                  </div>
                </div>
              </div>

                {/* Nom */}
                <div className="mb-4">
                <label
                  htmlFor="prenom"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    prénom
                </label>
                <div className="relative">
                  <div className="flex flex-col gap-1 w-full">
                    <input
                      placeholder="Prénom..."
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      type="text"
                      name="prenom"
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          prenom: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-red-500 text-md break-words h-[20px]">
                      {errors.prenom}
                    </p>
                  </div>
                </div>
              </div>
             
              {/* Numéro Identifiant */}
              <div className="mb-4">
                <label
                  htmlFor="numero_identifiant"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Numéro Identifiant
                </label>
                <input
                  placeholder="Numéro Identifiant..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="identifiant"
                  id="identifiant"
                  value={formData.identifiant}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      identifiant: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.identifiant}
                </p>
              </div>

                {/* Date de recrutement */}


                <div className="mb-4">
                <label
                  htmlFor="date_recrutement"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Date de recrutement
                </label>
                <input
                  placeholder="Date de recrutement..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="date"
                  name="date_recrutement"
                  id="date_recrutement"
                  value={formData.date_recrutement}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      date_recrutement: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.date_recrutement}
                </p>
              </div>


                {/* Email */}
                
                
                <div className="mb-4">
                <label
                  htmlFor="numero_identifiant"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                  placeholder="Email..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
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
            {update ? "modifier le surveillant général" : "ajouter le surveillant général"}
          </button>
        </div>
      </div>
    </>
  );
}