import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import AbsencesTable from "../assets/table/AbsencesTable";
import Pagination from "../../../../common/Pagination";
import { getAbsences } from "../../../../../assets/api/surveillant/absences/absences";
import { getGroupes } from "../../../../../assets/api/admin/groupe/groupe";
import TableOptions from "../../../../common/TableOptions";

export default function SurveillantAbsencesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const fetchGroupes = async () => {
      setLoading(true);
      const res = await getGroupes();
      setLoading(false);
      if (res.success) {
        setGroupes(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchGroupes();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Trigger search immediately as user types
    fetchData(1, pagination.per_page, value, selectedGroupe);
  };

  const handleSearchSubmit = () => {
    // This ensures search works on form submit too
    fetchData(1, pagination.per_page, searchTerm, selectedGroupe);
  };

  const handleGroupeChange = (groupeId) => {
    setSelectedGroupe(groupeId);
    fetchData(1, pagination.per_page, searchTerm, groupeId);
  };

  const handlePageChange = (page) => {
    fetchData(page, pagination.per_page, searchTerm, selectedGroupe);
  };
  const handlePerPageChange = (perPage) => {
    fetchData(1, perPage, searchTerm, selectedGroupe);
  };

  return (
    <>
      <title>Les absences</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        {" "}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Les absences
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6">
              <TableOptions
                groupes={groupes}
                selectedGroupe={selectedGroupe}
                setSelectedGroupe={handleGroupeChange}
                search={searchTerm}
                setSearch={handleSearch}
                onSearchSubmit={handleSearchSubmit}
                searchPlaceholder="Rechercher par date, nom du stagiaire ou formateur..."
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
