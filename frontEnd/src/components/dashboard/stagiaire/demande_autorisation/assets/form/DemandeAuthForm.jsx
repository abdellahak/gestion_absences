import { FaPlus, FaPen } from "react-icons/fa6";

export default function DemandeAuthForm({
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
          {update ? "Modifier demande d'autorisation" : "Ajouter une demande d'autorisation"}
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Objet */}
              <div className="mb-4">
                <label
                  htmlFor="intitule"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Objet
                </label>
                <input
                  placeholder="Objet..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="intitule"
                  id="intitule"
                  value={formData.intitule || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      intitule: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.intitule}
                </p>
              </div>
              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  placeholder="Description..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  name="description"
                  id="description"
                  value={formData.description || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.description}
                </p>
              </div>
              {/* Date */}
              <div className="mb-4">
                <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.date}
                </p>
              </div>
              {/* Heure début */}
              <div className="mb-4">
                <label htmlFor="heure_debut" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Heure début
                </label>
                <input
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="time"
                  name="heure_debut"
                  id="heure_debut"
                  value={formData.heure_debut || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      heure_debut: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.heure_debut}
                </p>
              </div>
              {/* Heure fin */}
              <div className="mb-4">
                <label htmlFor="heure_fin" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Heure fin
                </label>
                <input
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="time"
                  name="heure_fin"
                  id="heure_fin"
                  value={formData.heure_fin || ""}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      heure_fin: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.heure_fin}
                </p>
              </div>
              {/* Document */}
              <div className="mb-4">
                <label htmlFor="document" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Document
                </label>
                <input
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="file"
                  name="document"
                  id="document"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      document: e.target.files[0],
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.document}
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
            {update ? "modifier la demande" : "ajouter la demande"}
          </button>
        </div>
      </div>
    </>
  );
}