import { FaSearch } from "react-icons/fa";

export default function DemandesTableOptions({
  groupes,
  selectedGroupe,
  setSelectedGroupe,
  search,
  setSearch,
  onSearchSubmit,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  status,
  setStatus,
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Status Filter */}
        <div>
          <label
            htmlFor="status-select"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Filtrer par statut
          </label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="approuvee">Approuvée</option>
            <option value="refusee">Refusée</option>
          </select>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="date-from"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Date de début
          </label>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
          />
        </div>
        <div>
          <label
            htmlFor="date-to"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Date de fin
          </label>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
          />
        </div>
      </div>
    </div>
  );
}
