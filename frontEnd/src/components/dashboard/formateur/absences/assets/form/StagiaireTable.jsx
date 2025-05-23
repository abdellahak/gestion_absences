import { FaInfoCircle } from "react-icons/fa";

export default function StagiaireTable({
  selectedGroupe,
  filteredStagiaires,
  stagiaires,
  selectedStagiaires,
  handleStagiaireCheck,
  handleSelectAll,
  errors
}) {
  if (!selectedGroupe) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <span className="flex items-center gap-2 text-gray-500 text-lg font-medium">
          <FaInfoCircle className="text-xl text-gray-500" />
          Veuillez sélectionner un groupe d&apos;abord.
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              <div
                type="button"
                onClick={handleSelectAll}
                className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-[1.25px] border-gray-300 ${
                  selectedStagiaires.length === stagiaires.length &&
                  stagiaires.length > 0
                    ? "border-brand-500 bg-brand-500 "
                    : "bg-white"
                }`}
                aria-label="Tout sélectionner"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    selectedStagiaires.length === stagiaires.length && 
                    stagiaires.length > 0
                      ? "block"
                      : "hidden"
                  }
                >
                  <path
                    d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                    stroke="white"
                    strokeWidth="1.94437"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Nom
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Prénom
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Numéro d'inscription
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStagiaires.length > 0 ? (
            filteredStagiaires.map((stagiaire) => (
              <tr key={stagiaire.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div
                    onClick={() => handleStagiaireCheck(stagiaire.id)}
                    className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-[1.25px] border-gray-300 ${
                      selectedStagiaires.includes(stagiaire.id)
                        ? "border-brand-500 bg-brand-500"
                        : "bg-white"
                    }`}
                    aria-label="Sélectionner stagiaire"
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={selectedStagiaires.includes(stagiaire.id)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter")
                        handleStagiaireCheck(stagiaire.id);
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        selectedStagiaires.includes(stagiaire.id)
                          ? "block"
                          : "hidden"
                      }
                    >
                      <path
                        d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                        stroke="white"
                        strokeWidth="1.94437"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </td>
                <td className="px-4 py-2">{stagiaire.user?.nom}</td>
                <td className="px-4 py-2">{stagiaire.user?.prenom}</td>
                <td className="px-4 py-2">{stagiaire.user?.email}</td>
                <td className="px-4 py-2">{stagiaire.numero_inscription}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">
                Aucun stagiaire trouvé pour ce groupe.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}