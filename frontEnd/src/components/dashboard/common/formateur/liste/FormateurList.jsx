import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import DeleteConfirmation from "../../../../../assets/shared/DeleteConfirmation";
import FormateurTable from "../assets/table/FormateurTable";
import {
  getFormateurs,
  supprimerFormateur,
} from "../../../../../assets/api/admin/formateur/fomateur";

export default function FormateurList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getFormateurs();
      setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    const res = await supprimerFormateur(show);
    setDeleting(false);
    if (res.success) {
      toast("success", "Le formateur a été supprimé avec succès");
      setData((prev) => prev.filter((item) => item.id !== show));
      setShow(null);
    } else {
      toast("error", res.error);
    }
  };

  return (
    <>
      <title>Liste des formateurs</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Liste des formateurs
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
                <FormateurTable data={data} setShow={setShow} />
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
