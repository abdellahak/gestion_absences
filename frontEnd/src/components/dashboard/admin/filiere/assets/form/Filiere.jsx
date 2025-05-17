import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import FiliereForm from "./FiliereForm";
import { ajouterFiliere, modifierFiliere } from "../../../../../../assets/api/filiere/filiere";

export default function Filiere({
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
      res = await modifierFiliere(formData, FiliereId);
    } else {
      res = await ajouterFiliere(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "la filière a été modifiée avec succès");
      } else {
        setFormData({
          code: "",
          intitule: "",
        })
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
      <FiliereForm
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