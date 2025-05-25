import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import DeleteConfirmation from "../../../../../assets/shared/DeleteConfirmation";
import FormateurAbsencesTable from "../assets/table/FormatuerAbsencesTable";
import { getAbsences, supprimerAbsence } from "../../../../../assets/api/formateur/absences/absences";
import TableOptions from "../assets/table/TableOptions";
import { getFormateurGroupes } from "../../../../../assets/api/formateur/formateur groupes/formateurGroupes";

export default function FormateurAbsencesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAbsences(selectedGroupe);
      setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchData();
  }, [selectedGroupe]);

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


  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    const res = await supprimerAbsence(show);
    setDeleting(false);
    if (res.success) {
      toast("success", "L'absence a été supprimée avec succès");
      setData((prev) => prev.filter((item) => item.id !== show));
      setShow(null);
    } else {
      toast("error", res.error);
    }
  };

  return (
    <>
      <title>Liste des absences</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Liste des absences
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
                <FormateurAbsencesTable data={data} setShow={setShow} />
              )}
            </div>
            {show && (
              <DeleteConfirmation
                show={show}
                setShow={setShow}
                text={"cette absence"}
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
