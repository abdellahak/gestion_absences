import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import DemandeAuth from "../assets/form/DemandeAuth";
import { getDemandesAutorisation } from "../../../../../assets/api/stagiaires/demande_autorisation/demande_autorisation";

export default function ModifierDemande() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDemande = async () => {
      const res = await getDemandesAutorisation();
      setLoading(false);
      if (res.success) {
        // Cherche la demande à modifier par id
        const demande = res.data.find((d) => d.id === Number(id));
        setData(demande);
      } else {
        toast("error", res.error);
      }
    };
    fetchDemande();
  }, [id]);

  return (
    <>
      <title>Modifier Demande d'autorisation</title>
      {!loading ? (
        <DemandeAuth update demandeId={id} data={data} />
      ) : (
        <div className="flex justify-center items-center size-full">
          <div>
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}