import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Surveillant from "../assets/form/Surveillant";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import { getSurveillant } from "../../../../../assets/api/admin/surveillant/surveillant";

export default function ModifierSurveillant() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSurveillant = async () => {
      const res = await getSurveillant(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchSurveillant();
  }, [id]);

  return (

    <>
      <title>Modifier Surveillant Général</title>
      {!loading ? (
        <Surveillant update surveillantId={id} data={data} />
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