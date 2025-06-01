import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import DeleteConfirmation from "../../../../../assets/shared/DeleteConfirmation";
import StagiaireTable from "../assets/table/StagiaireTable";
import Pagination from "../../../../common/Pagination";
import {
  getStagiaires,
  supprimerStagiaire,
} from "../../../../../assets/api/admin/stagiaire/stagiaire";

export default function StagiairesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroupe, setSelectedGroupe] = useState("");

  const fetchData = async (
    page = 1,
    perPage = 10,
    search = "",
    groupeId = ""
  ) => {
    setLoading(true);
    const params = {
      page,
      per_page: perPage,
      ...(search && { search }),
      ...(groupeId && { groupe_id: groupeId }),
    };

    const res = await getStagiaires(params);
    setLoading(false);
    if (res.success) {
      setData(res.data.data || []);
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
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchData(1, pagination.per_page, value, selectedGroupe);
  };

  const handlePageChange = (page) => {
    fetchData(page, pagination.per_page, searchTerm, selectedGroupe);
  };

  const handlePerPageChange = (perPage) => {
    fetchData(1, perPage, searchTerm, selectedGroupe);
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    const res = await supprimerStagiaire(show);
    setDeleting(false);
    if (res.success) {
      toast("success", "Le stagiaire a été supprimé avec succès");
      fetchData(
        pagination.current_page,
        pagination.per_page,
        searchTerm,
        selectedGroupe
      );
      setShow(null);
    } else {
      toast("error", res.error);
    }
  };
  return (
    <>
      <title>Liste des stagiaires</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Liste des stagiaires
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
              {loading ? (
                <div className="size-full flex justify-center items-center py-12">
                  <div className="w-fit">
                    <Loading className="!p-5" />
                  </div>
                </div>
              ) : (
                <>
                  <StagiaireTable data={data} setShow={setShow} />
                  {data.length > 0 && (
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
            {show && (
              <DeleteConfirmation
                show={show}
                setShow={setShow}
                text={"ce stagiaire"}
                action={null}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
