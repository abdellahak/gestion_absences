import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import JustificationForm from "./JustificationForm";
import {
  ajouterJustification,
  modifierJustification,
} from "../../../../../../assets/api/stagiaires/justification/justification";

export default function Justification({
  update = false,
  justificationId = null,
  data = null,
  absences = [],
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    intitule: data?.intitule ?? "",
    absence_ids: data?.absence_ids ?? [],
    document: data?.document ?? null,
  });
  const [errors, setErrors] = useState({
    intitule: "",
    absence_ids: "",
    document: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      intitule: data?.intitule ?? "",
      absence_ids: data?.absence_ids ?? [],
      document: data?.document ?? null,
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    if (!formData.absence_ids || formData.absence_ids.length === 0) {
      setErrors((prev) => ({
        ...prev,
        absence_ids: "Veuillez sélectionner au moins une absence à justifier.",
      }));
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append("intitule", formData.intitule);
    formData.absence_ids.forEach(id => fd.append("absence_ids[]", id));
    if (formData.document && typeof formData.document !== "string") {
      fd.append("document", formData.document);
    }
    let res;
    if (update) {
      res = await modifierJustification(fd, justificationId);
    } else {
      res = await ajouterJustification(fd);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "La justification a été modifiée avec succès");
      } else {
        setFormData({
          intitule: "",
          absence_ids: [],
          document: null,
        });
        toast("success", "La justification a été ajoutée avec succès");
      }
      setErrors({
        intitule: "",
        absence_ids: "",
        document: "",
      });
    } else {
      if (res.server) {
        return toast("error", res?.server);
      }
      toast("error", "Les informations ne sont pas complètes");
      setErrors(res.errors);
    }
  };
  
  return (
    <>
      <JustificationForm
        update={update}
        handleSubmit={handleSubmit}
        absences={absences}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        loading={loading}
        
      />
    </>
  );
}