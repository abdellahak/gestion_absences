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
    setLoading(true);
    let res;
    if (update) {
      res = await modifierJustification(formData, justificationId);
    } else {
      res = await ajouterJustification(formData);
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