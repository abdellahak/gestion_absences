import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import DemandeAuthForm from "./DemandeAuthForm";
import {
  ajouterDemandeAutorisation,
  modifierDemandeAutorisation,
} from "../../../../../../assets/api/stagiaires/demande_autorisation/demande_autorisation";

export default function DemandeAuth({
  update = false,
  demandeId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    intitule: data?.intitule ?? "",
    description: data?.description ?? "",
    document: data?.document ?? "",
    date: data?.date ?? "",
    heure_debut: data?.heure_debut ?? "",
    heure_fin: data?.heure_fin ?? "",
  });
  const [errors, setErrors] = useState({
    intitule: "",
    description: "",
    document: "",
    date: "",
    heure_debut: "",
    heure_fin: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      intitule: data?.intitule ?? "",
      description: data?.description ?? "",
      document: data?.document ?? "",
      date: data?.date ?? "",
      heure_debut: data?.heure_debut ?? "",
      heure_fin: data?.heure_fin ?? "",
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierDemandeAutorisation(formData, demandeId);
    } else {
      res = await ajouterDemandeAutorisation(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "La demande a été modifiée avec succès");
      } else {
        setFormData({
          intitule: "",
          description: "",
          document: "",
          date: "",
          heure_debut: "",
          heure_fin: "",
        });
        toast("success", "La demande a été ajoutée avec succès");
      }
      setErrors({
        intitule: "",
        description: "",
        document: "",
        date: "",
        heure_debut: "",
        heure_fin: "",
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
      <DemandeAuthForm
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