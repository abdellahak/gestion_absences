import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import AbsencesTable from "../assets/table/AbsencesTable";
import Pagination from "../../../../common/Pagination";
import TableOptions from "../../../../common/TableOptions";
import { getAbsences } from "../../../../../assets/api/stagiaires/absences/absences";

export default function AbsencesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchData = async (
    page = 1,
    perPage = 10,
    search = "",
    status = ""
  ) => {
    setLoading(true);
    const params = {
      page,
      per_page: perPage,
      ...(search && { search }),
      ...(status && { status }),
    };

    const res = await getAbsences(params);
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
    fetchData(1, pagination.per_page, value, selectedStatus);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchData(1, pagination.per_page, searchTerm, status);
  };

  const handlePageChange = (page) => {
    fetchData(page, pagination.per_page, searchTerm, selectedStatus);
  };
  const handlePerPageChange = (perPage) => {
    fetchData(1, perPage, searchTerm, selectedStatus);
  };

  const handleSearchSubmit = () => {
    fetchData(1, pagination.per_page, searchTerm, selectedStatus);
  };

  const statusOptions = [
    { value: "en_attente", label: "En attente" },
    { value: "valide", label: "Validé" },
    { value: "refuse", label: "Refusé" },
    { value: "non_justifiee", label: "Non justifiée" },
  ];

  return (
    <>
      <title>Mes absences</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Mes absences
        </h2>{" "}
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6">
              <TableOptions
                search={searchTerm}
                setSearch={handleSearch}
                onSearchSubmit={handleSearchSubmit}
                searchPlaceholder="Rechercher par date ou nom du formateur..."
                status={selectedStatus}
                setStatus={handleStatusChange}
                statusOptions={statusOptions}
                showGroupes={false}
                showDateRange={false}
              />
              {loading ? (
                <div className="size-full flex justify-center items-center py-12">
                  <div className="w-fit">
                    <Loading className="!p-5" />
                  </div>
                </div>
              ) : (
                <>
                  <AbsencesTable data={data} />
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
          </div>
        </div>
      </div>
    </>
  );
}
