export default function TableOptions({
  groupes,
  selectedGroupe,
  setSelectedGroupe,
}) {
  return (
    <div className="mb-4">
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
        className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 h-11 rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
      >
        <option value="">Tous les groupes</option>
        {groupes.map((groupe) => (
          <option key={groupe.id} value={groupe.id}>
            {groupe.intitule}
          </option>
        ))}
      </select>
    </div>
  );
}