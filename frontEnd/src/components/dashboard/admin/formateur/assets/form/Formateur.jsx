import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import FormateurForm from "./FormateurForm";
import { ajouterFormateur, modifierFromateur } from "../../../../../../assets/api/admin/formateur/fomateur";

export default function Formateur({
  update = false,
 formateurId=null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: data?.user_id ?? "",
    identifiant: data?.user?.identifiant ?? "",
    date_recrutement: data?.date_recrutement ?? "",
    nom: data?.user?.nom ?? data?.nom ?? "",
    prenom: data?.user?.prenom ?? data?.prenom ?? "",
    email: data?.user?.email ?? data?.email ?? "",
  });
  const [errors, setErrors] = useState({
    user_id: "",
    identifiant: "",
    date_recrutement: "",
    nom: "",
    prenom: "",
    email: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      user_id: data?.user_id ?? "",
      identifiant: data?.user?.identifiant ?? "",
      date_recrutement: data?.date_recrutement ?? "",
      nom: data?.user?.nom ?? data?.nom ?? "",
      prenom: data?.user?.prenom ?? data?.prenom ?? "",
      email: data?.user?.email ?? data?.email ?? "",
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierFromateur(formData, formateurId);
    } else {
      res = await ajouterFormateur(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "Le Formateur a été modifié avec succès");
      } else {
        setFormData({
          user_id: "",
          identifiant: "",
          date_recrutement: "",
          nom: "",
          prenom: "",
          email: "",
        });
        toast("success", "Le Formateur a été ajouté avec succès");
      }
      setErrors({
        user_id: "",
        identifiant: "",
        date_recrutement: "",
        nom: "",
        prenom: "",
        email: "",
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
      <FormateurForm
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