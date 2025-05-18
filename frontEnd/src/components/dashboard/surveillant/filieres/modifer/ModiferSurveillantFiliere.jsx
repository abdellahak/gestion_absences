import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import SurveillantFiliere from "../assets/form/SurveillantFiliere";
import { getSurveillantFiliere } from "../../../../../assets/api/surveillant/surveillant filieres/SurveillantFilieres";

export default function ModifierSurveillantFiliere() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchFiliere = async () => {
      const res = await getSurveillantFiliere(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchFiliere();
  }, [id]);
  return (
    <>
      <title>Modifier Filiere</title>

      {!loading ? (
        <SurveillantFiliere update FiliereId={id} data={data} />
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
