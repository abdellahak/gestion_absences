import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import FormateurStagiairesTable from "../assets/table/FormateurStagiairesTable";
import TableOptions from "../assets/table/TableOptions";
import Pagination from "../../../../common/Pagination";
import { getFormateurGroupes } from "../../../../../assets/api/formateur/formateur groupes/formateurGroupes";
import { getFormateurStagiaires } from "../../../../../assets/api/formateur/formateur stagiaires/formateurStagiaires";

export default function FormateurStagiairesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [stagiaires, setStagiaires] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStagiaires = async (page = 1, perPage = 10, search = "") => {
    setLoading(true);
    const params = {
      page,
      per_page: perPage,
      ...(search && { search }),
    };

    const res = await getFormateurStagiaires(selectedGroupe, params);
    setLoading(false);
    if (res.success) {
      setStagiaires(res.data.data || []);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
        per_page: res.data.per_page,
      });
    } else {
      toast("error", res.error);
    }
  };

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
    fetchStagiaires();
  }, [selectedGroupe]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchStagiaires(1, pagination.per_page, value);
  };

  const handlePageChange = (page) => {
    fetchStagiaires(page, pagination.per_page, searchTerm);
  };

  const handlePerPageChange = (perPage) => {
    fetchStagiaires(1, perPage, searchTerm);
  };
  return (
    <>
      <title>Mes stagiaires</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Mes stagiaires
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou numéro d'inscription..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6">
              <TableOptions
                groupes={groupes}
                selectedGroupe={selectedGroupe}
                setSelectedGroupe={setSelectedGroupe}
              />
              {loading ? (
                <div className="size-full flex justify-center items-center py-12">
                  <div className="w-fit">
                    <Loading className="!p-5" />
                  </div>
                </div>
              ) : (
                <>
                  <FormateurStagiairesTable data={stagiaires} />
                  {stagiaires.length > 0 && (
                    <Pagination
                      currentPage={pagination.current_page}
                      lastPage={pagination.last_page}
                      total={pagination.total}
                      perPage={pagination.per_page}
                      onPageChange={handlePageChange}
                      onPerPageChange={handlePerPageChange}
                      loading={loading}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
