import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Surveillantgeneralle from "../assets/form/Surveillantgeneralle";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import { getSurveillantGeneral } from "../../../../../assets/api/admin/surveillantgeneralle/surveillantgeneralle";

export default function ModifierSurveillantgeneralle() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSurveillantgeneralle = async () => {
      const res = await getSurveillantGeneral(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchSurveillantgeneralle();
  }, [id]);

  return (

    <>
      <title>Modifier Surveillant Général</title>
      {!loading ? (
        <Surveillantgeneralle update surveillantgeneralleId={id} data={data} />
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