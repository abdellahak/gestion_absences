import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import { ajouterSurveillantStagiaire, modifierSurveillantStagiaire } from "../../../../../../assets/api/surveillant/surveillant stagiaires/SurveillantStagiaires";
import SurveillantStagiaireForm from "./SurveillantStagiaireForm";

export default function SurveillantStagiaire({
  update = false,
  stagiaireId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: data?.user_id ?? "",
    groupe_id: data?.groupe_id ?? "",
    numero_inscription: data?.numero_inscription ?? "",
    nom: data?.user?.nom ?? data?.nom ?? "",
    prenom: data?.user?.prenom ?? data?.prenom ?? "",
    email: data?.user?.email ?? data?.email ?? "",
    telephone: data?.user?.telephone ?? data?.telephone ?? "",
    adresse : data?.user?.adresse ?? data?.adresse ?? "",
    sexe :  data?.sexe ?? data?.sexe ?? "",
    CNI: data?.user?.CNI ?? data?.CNI ?? "",
    date_naissance: data?.user?.date_naissance ?? data?.date_naissance ?? "",
   


  });
  const [errors, setErrors] = useState({
    user_id: "",
    groupe_id: "",
    numero_inscription: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    sexe: "",
    CNI: "",
    date_naissance: "",
    lieu_naissance: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      user_id: data?.user_id ?? "",
      groupe_id: data?.groupe_id ?? "",
      numero_inscription: data?.numero_inscription ?? "",
      nom: data?.user?.nom ?? data?.nom ?? "",
      prenom: data?.user?.prenom ?? data?.prenom ?? "",
      email: data?.user?.email ?? data?.email ?? "",
      telephone: data?.user?.telephone ?? data?.telephone ?? "",
      adresse : data?.user?.adresse ?? data?.adresse ?? "",
      sexe :  data?.sexe ?? data?.sexe ?? "",
      CNI: data?.user?.CNI ?? data?.CNI ?? "",
      date_naissance: data?.user?.date_naissance ?? data?.date_naissance ?? "",
      lieu_naissance : data?.user?.lieu_naissance ?? data?.lieu_naissance ?? "",
   
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierSurveillantStagiaire(formData, stagiaireId);
    } else {
      res = await ajouterSurveillantStagiaire(formData);
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
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          adresse: "",
          sexe: "",
          CNI: "",
          date_naissance: "",
          lieu_naissance: "",
        });
        toast("success", "Le stagiaire a été ajouté avec succès");
      }
      setErrors({
        user_id: "",
        groupe_id: "",
        numero_inscription: "",
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        sexe: "",
        CNI: "",
        date_naissance: "",
        lieu_naissance: "",
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
      <SurveillantStagiaireForm
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