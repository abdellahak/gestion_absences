import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import FormateurDemandesTable from "../assets/table/FormateurDemandesTable";
import TableOptions from "../../../../common/TableOptions";
import { getDemandes } from "../../../../../assets/api/formateur/demandes/demandes";
import { getFormateurGroupes } from "../../../../../assets/api/formateur/formateur groupes/formateurGroupes";

export default function FormateurDemandesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchGroupes = async () => {
      setLoading(true);
      const res = await getFormateurGroupes();
      setLoading(false);
      if (res.success) {
        setGroupes(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchGroupes();
  }, []);
  useEffect(() => {
    const fetchDemandes = async () => {
      setLoading(true);
      const res = await getDemandes(
        selectedGroupe,
        searchTerm,
        status,
        dateFrom,
        dateTo
      );
      setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchDemandes();
  }, [selectedGroupe, searchTerm, status, dateFrom, dateTo]);
  const handleSearchSubmit = () => {
    setSearchTerm(search);
  };

  const handleGroupeChange = (groupe) => {
    setSelectedGroupe(groupe);
  };

  const handleSearchChange = (searchValue) => {
    setSearch(searchValue);
    // Trigger immediate search when typing
    setSearchTerm(searchValue);
  };

  const statusOptions = [
    { value: "en_attente", label: "En attente" },
    { value: "approuvee", label: "Approuvée" },
    { value: "refusee", label: "Refusée" },
  ];

  return (
    <>
      <title>Demandes d'autorisation</title>
      <div className="p-4 md:p-6 xl:mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Demandes d'autorisation
          </h2>
          <p className="text-gray-600 text-sm">
            Consultez les demandes d'autorisation de vos stagiaires
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <TableOptions
              groupes={groupes}
              selectedGroupe={selectedGroupe}
              setSelectedGroupe={handleGroupeChange}
              search={search}
              setSearch={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              searchPlaceholder="Rechercher par intitulé, description ou nom du stagiaire..."
              status={status}
              setStatus={setStatus}
              statusOptions={statusOptions}
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              dateTo={dateTo}
              setDateTo={setDateTo}
              showDateRange={true}
            />
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loading />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {data.length} demande{data.length > 1 ? "s" : ""} trouvée
                    {data.length > 1 ? "s" : ""}
                    {selectedGroupe && (
                      <span className="ml-1">pour le groupe sélectionné</span>
                    )}
                    {searchTerm && (
                      <span className="ml-1">
                        correspondant à "{searchTerm}"
                      </span>
                    )}
                  </p>
                </div>
                <FormateurDemandesTable data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
