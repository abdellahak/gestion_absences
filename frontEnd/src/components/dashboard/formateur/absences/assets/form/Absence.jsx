import { useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import AbsenceForm from "./AbsenceForm";
import { ajouterAbsence } from "../../../../../..//assets/api/formateur/absences/absences";

export default function Absence() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    stagiaires: [],
    date_absence: new Date().toISOString().split("T")[0], // Current date
    heure_debut: "",
    heure_fin: "",
  });
  const [errors, setErrors] = useState({
    stagiaires: "",
    date_absence: "",
    heure_debut: "",
    heure_fin: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      stagiaires: "",
      date_absence: "",
      heure_debut: "",
      heure_fin: "",
    });
    if (loading) return;

    setLoading(true);
    const res = await ajouterAbsence(formData);
    setLoading(false);

    if (res.success) {
      toast("success", "L'absence a été ajoutée avec succès");
      
      setErrors({
        stagiaires: "",
        date_absence: "",
        heure_debut: "",
        heure_fin: "",
      });
    } else {
      if (res.server) {
        return toast("error", res?.server);
      }
      toast("error", "Les informations ne sont pas complètes");
      setErrors(res.errors || {});
    }
  };

  return (
    <>
      <title>Ajouter une absence</title>
      <AbsenceForm
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
