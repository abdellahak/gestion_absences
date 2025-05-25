import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Formateur from "../assets/form/Formateur";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import { getFormateur } from "../../../../../assets/api/admin/formateur/fomateur";

export default function ModifierFormateur() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchFormateur = async () => {
      const res = await getFormateur(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchFormateur();
  }, [id]);

  return (
    <>
      <title>Modifier Fromateur</title>
      {!loading ? (
        <Formateur update formateurId={id} data={data} />
      ) : (
        <div className="flex justify-center items-center size-full">
          <div className="">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}