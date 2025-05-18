import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import { getSurveillantStagiaire } from "../../../../../assets/api/surveillant/surveillant stagiaires/SurveillantStagiaires";
import SurveillantStagiaire from "../assets/form/SurveillantStagiaire";

export default function ModifierSurveillantStagiaire() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStagiaire = async () => {
      const res = await getSurveillantStagiaire(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchStagiaire();
  }, [id]);

  return (
    <>
      <title>Modifier Stagiaire</title>
      {!loading ? (
        <SurveillantStagiaire update stagiaireId={id} data={data} />
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