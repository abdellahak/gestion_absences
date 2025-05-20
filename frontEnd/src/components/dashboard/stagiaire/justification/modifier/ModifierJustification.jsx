import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import JustificationForm from "../assets/form/JustificationForm";
import { getJustification, modifierJustification } from "../../../../../assets/api/stagiaires/justification/justification";
import { getAbsences } from "../../../../../assets/api/stagiaires/absences/absences";

export default function ModifierJustification() {
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    intitule: "",
    absence_ids: [],
    document: null,
  });
  const [absences, setAbsences] = useState([]);
  const [absencesLoading, setAbsencesLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAbsences = async () => {
      setAbsencesLoading(true);
      const res = await getAbsences();
      if (res.success) setAbsences(res.data);
      setAbsencesLoading(false);
    };
    fetchAbsences();
  }, []);

  useEffect(() => {
    const fetchJustification = async () => {
      setLoading(true);
      const res = await getJustification(id);
      setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res?.error || "Erreur lors du chargement");
      }
    };
    fetchJustification();
  }, [id]);

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        absence_ids: (data.absence_ids ?? []).map(String),
        document: data.document ?? null,
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    const res = await modifierJustification(formData, id);
    setLoading(false);

    if (res.success) {
      toast("success", "Justification modifiée avec succès");
      // Redirect or update UI if needed
    } else {
      if (res.server) toast("error", res.server);
      else toast("error", "Erreur lors de la modification");
      setErrors(res.errors || {});
    }
  };

  return (
    <>
      <title>Modifier Justification</title>
      {!loading && formData ? (
        <JustificationForm
          update
          justificationId={id}
          formData={formData}
          setFormData={setFormData}
          absences={absences}
          absencesLoading={absencesLoading}
          errors={errors}
          setErrors={setErrors}
          handleSubmit={handleSubmit}
        />
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