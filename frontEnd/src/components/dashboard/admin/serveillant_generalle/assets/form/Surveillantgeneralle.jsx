import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import SurveillantgeneralleForm from "./SurveillantgeneralleForm";
import {
  ajouterSurveillantGeneral,
  modifierSurveillantGeneral,
} from "../../../../../../assets/api/admin/surveillantgeneralle/surveillantgeneralle";

export default function SurveillantGeneralle({
  update = false,
  surveillantGeneralleId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date_recrutement: data?.date_recrutement ?? "",
    nom: data?.user?.nom ?? "",
    prenom: data?.user?.prenom ?? "",
    email: data?.user?.email ?? "",
    identifiant: data?.user?.identifiant ?? "",
     ...(update && { user_id: data?.user_id ?? "" }),
  });
  const [errors, setErrors] = useState({
    user_id: "",
    date_recrutement: "",
    nom: "",
    prenom: "",
    email: "",
    identifiant: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      date_recrutement: data?.date_recrutement ?? "",
      nom: data?.user?.nom ?? "",
      prenom: data?.user?.prenom ?? "",
      email: data?.user?.email ?? "",
      identifiant: data?.user?.identifiant ?? "",
       ...(update && { user_id: data?.user_id ?? "" }),
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);


    let dataToSend = { ...formData }
    if (!update) {
      delete dataToSend.user_id
    }


    let res;
    if (update) {
      res = await modifierSurveillantGeneral(formData, surveillantGeneralleId);
    } else {
      res = await ajouterSurveillantGeneral(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "Le surveillant général a été modifié avec succès");
      } else {
        setFormData({
          date_recrutement: "",
          nom: "",
          prenom: "",
          email: "",
          identifiant: "",
        });
       
        toast("success", "Le surveillant général a été ajouté avec succès");
      }
      setErrors({
        user_id: "",
        date_recrutement: "",
        nom: "",
        prenom: "",
        email: "",
        identifiant: "",
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
      <SurveillantgeneralleForm
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