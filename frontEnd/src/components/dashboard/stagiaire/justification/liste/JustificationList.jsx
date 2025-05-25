import { useEffect, useState } from "react";
import { getJustifications, supprimerJustification } from "../../../../../assets/api/stagiaires/justification/justification";
import JustificationTable from "../assets/table/JustificationTable";
import DeleteConfirmation from "../../../../../assets/shared/DeleteConfirmation";
import { useToast } from "../../../../../assets/toast/Toast";

export default function JustificationList() {
  const [justifications, setJustifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(null);
  const { toast } = useToast();

  const fetchJustifications = async () => {
    setLoading(true);
    const res = await getJustifications();
    if (res.success) setJustifications(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJustifications();
  }, []);

  const handleDelete = async () => {
    if (!showDelete) return;
    const res = await supprimerJustification(showDelete);
    if (res.success) {
      toast("success", "Justification supprimée avec succès");
      setShowDelete(null);
      fetchJustifications();
    } else {
      toast("error", res.error);
    }
  };

  return (
    <>
      <title>Mes justifications</title>
      <div className="p-4 md:p-6 max-w-[1500px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Mes justifications
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6">
              {loading ? (
                <div className="size-full flex justify-center items-center py-12">
                  <div className="w-fit">
                    <span className="text-gray-500">Chargement...</span>
                  </div>
                </div>
              ) : (
                <JustificationTable data={justifications} setShow={setShowDelete} />
              )}
            </div>
            {showDelete && (
              <DeleteConfirmation
                setShow={setShowDelete}
                handleDelete={handleDelete}
                text="Voulez-vous vraiment supprimer cette justification ?"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}