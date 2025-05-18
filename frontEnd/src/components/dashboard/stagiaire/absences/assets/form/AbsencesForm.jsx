import { useEffect, useState } from "react";
import Loading from "../../../../../assets/loading/Loading";
import { FaPlus, FaPen } from "react-icons/fa6";
import { getAbsences } from "../../../../../assets/api/stagiaires/absences/absences";

export default function AbsencesForm({
  handleSubmit,
  errors,
  formData,
  setFormData,
  setErrors,
  update,
  loading,
}) {
  const [absences, setAbsences] = useState([]);
  const [loadingAbsences, setLoadingAbsences] = useState(false);

  useEffect(() => {
    const fetchAbsences = async () => {
      setLoadingAbsences(true);
      const res = await getAbsences();
      setLoadingAbsences(false);
      if (res && res.success) {
        setAbsences(res.data);
      }
    };
    fetchAbsences();
  }, []);

  return (
    <>
      <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {update ? "Modifier absence" : "Ajouter une absence"}
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Date d'absence */}
              <div className="mb-4">
                <label
                  htmlFor="date_absence"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Date d'absence
                </label>
                <input
                  placeholder="Date d'absence..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="date"
                  name="date_absence"
                  id="date_absence"
                  value={formData.date_absence}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      date_absence: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.date_absence}
                </p>
              </div>
              {/* Heure début */}
              <div className="mb-4">
                <label
                  htmlFor="heure_debut"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Heure début
                </label>
                <input
                  placeholder="Heure début..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="time"
                  name="heure_debut"
                  id="heure_debut"
                  value={formData.heure_debut}
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
                <label
                  htmlFor="heure_fin"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Heure fin
                </label>
                <input
                  placeholder="Heure fin..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="time"
                  name="heure_fin"
                  id="heure_fin"
                  value={formData.heure_fin}
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
              {/* Motif */}
              <div className="mb-4">
                <label
                  htmlFor="motif"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Motif
                </label>
                <input
                  placeholder="Motif..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="motif"
                  id="motif"
                  value={formData.motif}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      motif: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.motif}
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
            {update ? "modifier l'absence" : "ajouter l'absence"}
          </button>
        </div>
      </div>
    </>
  );
}