import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import DemandeAuthTable from "../assets/table/DemandeAuthTable";
import { getDemandesAutorisation } from "../../../../../assets/api/stagiaires/demande_autorisation/demande_autorisation";

export default function DemandeAuthList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ key: "date", order: "desc" }); // key: "date" or "status"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getDemandesAutorisation();
      setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchData();
  }, []);

  // Tri dynamique
  const sortedData = [...data].sort((a, b) => {
    if (sort.key === "status") {
      const aChar = (a.status || "").toLowerCase().charAt(0);
      const bChar = (b.status || "").toLowerCase().charAt(0);
      if (aChar < bChar) return sort.order === "asc" ? -1 : 1;
      if (aChar > bChar) return sort.order === "asc" ? 1 : -1;
      return 0;
    }
    if (sort.key === "date") {
      if (a.date < b.date) return sort.order === "asc" ? -1 : 1;
      if (a.date > b.date) return sort.order === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  return (
    <>
      <title>Mes demandes d'autorisation</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Mes demandes d'autorisation
        </h2>
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
                <DemandeAuthTable
                  data={sortedData}
                  setSort={setSort}
                  sort={sort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
