import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import StagiaireForm from "./StagiaireForm";
import {
  ajouterStagiaire,
  modifierStagiaire,
} from "../../../../../../assets/api/admin/stagiaire/stagiaire";

export default function Stagiaire({
  update = false,
  stagiaireId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: data?.user_id ?? "",
    groupe_id: data?.groupe_id ?? "",
    numero_inscription: data?.numero_inscription ?? "",
  });
  const [errors, setErrors] = useState({
    user_id: "",
    groupe_id: "",
    numero_inscription: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      user_id: data?.user_id ?? "",
      groupe_id: data?.groupe_id ?? "",
      numero_inscription: data?.numero_inscription ?? "",
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierStagiaire(formData, stagiaireId);
    } else {
      res = await ajouterStagiaire(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "Le stagiaire a été modifié avec succès");
      } else {
        setFormData({
          user_id: "",
          groupe_id: "",
          numero_inscription: "",
        });
        toast("success", "Le stagiaire a été ajouté avec succès");
      }
      setErrors({
        user_id: "",
        groupe_id: "",
        numero_inscription: "",
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
      <StagiaireForm
        update={update}
        handleSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        setFormData={setFormData}
        setErrors={setErrors}
        loading={loading}
      />
    </>
  );
}