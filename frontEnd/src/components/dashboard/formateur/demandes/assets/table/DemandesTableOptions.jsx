import { FaSearch } from "react-icons/fa";

export default function DemandesTableOptions({
  groupes,
  selectedGroupe,
  setSelectedGroupe,
  search,
  setSearch,
  onSearchSubmit,
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Groupe Filter */}
        <div>
          <label
            htmlFor="groupe-select"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Filtrer par groupe
          </label>
          <select
            id="groupe-select"
            value={selectedGroupe}
            onChange={(e) => setSelectedGroupe(e.target.value)}
            className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
          >
            <option value="">Tous les groupes</option>
            {groupes.map((groupe) => (
              <option key={groupe.id} value={groupe.id}>
                {groupe.intitule}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label
            htmlFor="search-input"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Rechercher
          </label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              id="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par intitulé, description ou nom du stagiaire..."
              className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaSearch className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
