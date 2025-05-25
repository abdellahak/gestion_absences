import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import SurveillantForm from "./SurveillantForm";
import {
  ajouterSurveillant,
  modifierSurveillant,
} from "../../../../../../assets/api/admin/surveillant/surveillant";

export default function Surveillant({
  update = false,
  surveillantId = null,
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
      res = await modifierSurveillant(formData, surveillantId);
    } else {
      res = await ajouterSurveillant(formData);
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
      <SurveillantForm
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