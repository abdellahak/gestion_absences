import { CiSearch } from "react-icons/ci";

export default function GroupAndSearchSelector({
  groupes,
  selectedGroupe,
  setSelectedGroupe,
  search,
  setSearch,
  loading
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Groupe
        </label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-sm transition w-full"
          value={selectedGroupe}
          onChange={(e) => setSelectedGroupe(e.target.value)}
          disabled={loading}
        >
          <option value="">Sélectionner un groupe</option>
          {groupes.map((groupe) => (
            <option key={groupe.id} value={groupe.id}>
              {groupe.intitule}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Recherche
        </label>
        <div className="relative">
          <CiSearch
            className="absolute -translate-y-1/2 pointer-events-none top-1/2 left-4"
            height="20"
            width="20"
          />
          <input
            type="text"
            className={
              "shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[400px]" +
              (!selectedGroupe ? " cursor-not-allowed" : "")
            }
            disabled={!selectedGroupe}
            placeholder="Rechercher (nom, prénom, email, numéro d'inscription)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}