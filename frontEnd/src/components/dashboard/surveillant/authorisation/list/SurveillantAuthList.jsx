import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import {
  getDemandes,
  getGroupes,
} from "../../../../../assets/api/surveillant/DemandesAuth/demandes";
import SurveillantDemandesAuthTable from "../assets/table/SurveillantDemandesAuthTable";
import Pagination from "../../../../common/Pagination";
import TableOptions from "../../../../common/TableOptions";

export default function SurveillantAuthList() {
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
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchData = async (
    page = 1,
    perPage = 10,
    search = "",
    groupeId = "",
    status = ""
  ) => {
    setLoading(true);
    const params = {
      page,
      per_page: perPage,
      ...(search && { search }),
      ...(groupeId && { groupe_id: groupeId }),
      ...(status && { status }),
    };

    const res = await getDemandes(params);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Trigger search immediately as user types
    fetchData(1, pagination.per_page, value, selectedGroupe, selectedStatus);
  };

  const handleSearchSubmit = () => {
    fetchData(
      1,
      pagination.per_page,
      searchTerm,
      selectedGroupe,
      selectedStatus
    );
  };

  const handleGroupeChange = (groupeId) => {
    setSelectedGroupe(groupeId);
    fetchData(1, pagination.per_page, searchTerm, groupeId, selectedStatus);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchData(1, pagination.per_page, searchTerm, selectedGroupe, status);
  };

  const handlePageChange = (page) => {
    fetchData(
      page,
      pagination.per_page,
      searchTerm,
      selectedGroupe,
      selectedStatus
    );
  };
  const handlePerPageChange = (perPage) => {
    fetchData(1, perPage, searchTerm, selectedGroupe, selectedStatus);
  };

  const statusOptions = [
    { value: "en_attente", label: "En attente" },
    { value: "valide", label: "Approuvé" },
    { value: "refuse", label: "Rejeté" },
  ];

  return (
    <>
      <title>List demandes d'autorisation</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          List demandes d'autorisation
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
                searchPlaceholder="Rechercher par date, description ou nom du stagiaire..."
                status={selectedStatus}
                setStatus={handleStatusChange}
                statusOptions={statusOptions}
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
                  <SurveillantDemandesAuthTable data={data} />
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
