import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import { getSurveillantGroupe } from "../../../../../assets/api/surveillant/surveillant groupes/surveillantGroups";
import SurveillantGroup from "../assets/form/SurvillantGroupes";
export default function ModifierSurveillantGroupe() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGroupe = async () => {
      const res = await getSurveillantGroupe(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchGroupe();
  }, [id]);

  return (
    <>
      <title>Modifier Groupe</title>
      {!loading ? (
        <SurveillantGroup update GroupId={id} data={data} />
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