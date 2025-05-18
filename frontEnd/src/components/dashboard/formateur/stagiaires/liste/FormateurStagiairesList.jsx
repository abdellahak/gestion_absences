import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import FormateurStagiairesTable from "../assets/table/FormateurStagiairesTable";
import TableOptions from "../assets/table/TableOptions";
import { getFormateurGroupes } from "../../../../../assets/api/formateur/formateur groupes/formateurGroupes";
import { getFormateurStagiaires } from "../../../../../assets/api/formateur/formateur stagiaires/formateurStagiaires";

export default function FormateurStagiairesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState(""); // Default: show all
  const [stagiaires, setStagiaires] = useState([]);

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
    const fetchStagiaires = async () => {
      setLoading(true);
      const res = await getFormateurStagiaires(selectedGroupe);
      setLoading(false);
      if (res.success) {
        setStagiaires(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchStagiaires();
  }, [selectedGroupe]);

  return (
    <>
      <title>Mes stagiaires</title>
      <div className="p-4 md:p-6 max-w-[1500px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Mes stagiaires
        </h2>
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
                <FormateurStagiairesTable data={stagiaires} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
