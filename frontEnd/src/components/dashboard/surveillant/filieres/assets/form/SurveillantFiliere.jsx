import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";

import SurveillantFiliereForm from "./SurveillantFiliereForm";
import { modifierSurveillantFiliere } from "../../../../../../assets/api/surveillant/surveillant filieres/SurveillantFilieres";

export default function SurveillantFiliere({
  update = false,
  FiliereId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: data?.code ?? "",
    intitule: data?.intitule ?? "",
  });
  const [errors, setErrors] = useState({
    code: "",
    intitule: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      code: data?.code ?? "",
      intitule: data?.intitule ?? "",
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierSurveillantFiliere(formData, FiliereId);
    } 
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "la filière a été modifiée avec succès");
      } else {
        setFormData({
          code: "",
          intitule: "",
        });
        toast("success", "la filière a été ajoutée avec succès");
      }
      setErrors({
        code: "",
        intitule: "",
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
      <SurveillantFiliereForm
        update={update}
        handleSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        setFormData={setFormData}
        setErrors={setErrors}
      />
    </>
  );
}
