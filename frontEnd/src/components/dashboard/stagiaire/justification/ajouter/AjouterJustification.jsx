import { useEffect, useState } from "react";
import JustificationForm from "../assets/form/JustificationForm";
import { getAbsences } from "../../../../../assets/api/stagiaires/absences/absences";
import { ajouterJustification } from "../../../../../assets/api/stagiaires/justification/justification";
import { useToast } from "../../../../../assets/toast/Toast";

export default function AjouterJustification() {
  const [absences, setAbsences] = useState([]);
  const [absencesLoading, setAbsencesLoading] = useState(false);
  const [formData, setFormData] = useState({
    intitule: "",
    absence_ids: [],
    document: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAbsences = async () => {
      setAbsencesLoading(true);
      const res = await getAbsences();
      if (res.success) setAbsences(res.data);
      setAbsencesLoading(false);
    };
    fetchAbsences();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append("intitule", formData.intitule);
    formData.absence_ids.forEach(id => fd.append("absence_ids[]", id));
    if (formData.document) fd.append("document", formData.document);

    const res = await ajouterJustification(fd);
    setLoading(false);

    if (res.success) {
      setFormData({ intitule: "", absence_ids: [], document: null });
      setErrors({});
      toast("success", "Justification ajoutée avec succès");
    } else {
      if (res.server) {
        toast("error", res.server);
      } else {
        toast("error", "Les informations ne sont pas complètes");
      }
      setErrors(res.errors || {});
    }
  };

  return (
    <>
      <title>Ajouter une justification</title>
      <JustificationForm
        absences={absences}
        absencesLoading={absencesLoading}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}