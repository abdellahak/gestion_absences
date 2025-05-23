import { FaPlus, FaPen } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";

export default function JustificationForm({
  handleSubmit,
  errors,
  formData,
  setFormData,
  update = false,
  loading,
  absences,
  absencesLoading = false, 
}) {

  const handleCheckboxChange = (id) => {
    setFormData((prev) => {
      const exists = prev.absence_ids.includes(id.toString());
      return {
        ...prev,
        absence_ids: exists
          ? prev.absence_ids.filter((aid) => aid !== id.toString())
          : [...prev.absence_ids, id.toString()],
      };
    });
  };

  // Filtrer les absences selon le mode
  const filteredAbsences = update
    ? absences.filter(
        (absence) =>
          // Afficher si pas de justification, ou justification non valide, ou fait partie de la justification en cours
          !absence.justification ||
          absence.justification.status !== "valide" ||
          (formData.absence_ids && formData.absence_ids.includes(absence.id.toString()))
      )
    : absences.filter(
        (absence) =>
          // En mode ajout, afficher seulement les absences non justifiées ou refusées
          !absence.justification || absence.justification.status === "refuse"
      );

  return (
    <>
      <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {update ? "Modifier justification" : "Ajouter une justification"}
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <form
              className="border-t border-gray-100 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              encType="multipart/form-data"
            >
              {/* Intitulé */}
              <div className="mb-4">
                <label
                  htmlFor="intitule"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Intitulé
                </label>
                <input
                  placeholder="Intitulé de la justification..."
                  className={`shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3 ${
                    errors.intitule ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="intitule"
                  id="intitule"
                  value={formData.intitule || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      intitule: e.target.value,
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.intitule}
                </p>
              </div>
              {/* Absences à justifier */}
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Sélectionnez les absences à justifier
                </label>
                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto border rounded p-2">
                  {absencesLoading ? (
                    <div className="flex items-center gap-2 text-brand-500">
                      <FaSpinner className="animate-spin" /> Chargement des absences...
                    </div>
                  ) : filteredAbsences.length === 0 ? (
                    <div className="text-gray-500">Vous n'avez aucune absence.</div>
                  ) : (
                    filteredAbsences.map(absence => (
                      <label key={absence.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.absence_ids.includes(absence.id.toString())}
                          onChange={() => handleCheckboxChange(absence.id)}
                        />
                        <span>
                          {absence.date_absence} ({absence.heure_debut} - {absence.heure_fin})
                        </span>
                        {absence.justification && (
                          <span className={`text-xs ml-2 ${
                            absence.justification.status === "valide"
                              ? "text-green-500"
                              : "text-blue-500"
                          }`}>
                            (Déjà justifiée: {absence.justification.status})
                          </span>
                        )}
                      </label>
                    ))
                  )}
                </div>
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.absence_ids}
                </p>
              </div>
              {/* Document justificatif */}
              <div className="mb-4">
                <label
                  htmlFor="document"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Document justificatif
                </label>
                <input
                  className={`shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3 ${
                    errors.document ? "border-red-500" : ""
                  }`}
                  type="file"
                  name="document"
                  id="document"
                  accept="application/pdf,image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      document: e.target.files[0],
                    }))
                  }
                />
                <p className="text-red-500 text-md break-words h-[20px]">
                  {errors.document}
                </p>
              </div>
              {/* Bouton */}
              <div className="col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium transition-colors rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60"
                >
                  {update ? <FaPen /> : <FaPlus />}
                  {update ? "modifier la justification" : "ajouter la justification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}