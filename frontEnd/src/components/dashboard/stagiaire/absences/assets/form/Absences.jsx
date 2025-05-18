import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import AbsencesForm from "./AbsencesForm";
import {
  ajouterAbsence,
  modifierAbsence,
} from "../../../../../assets/api/stagiaires/absences/absences";

export default function Absences({
  update = false,
  absenceId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date_absence: data?.date_absence ?? "",
    heure_debut: data?.heure_debut ?? "",
    heure_fin: data?.heure_fin ?? "",
    motif: data?.motif ?? "",
  });
  const [errors, setErrors] = useState({
    date_absence: "",
    heure_debut: "",
    heure_fin: "",
    motif: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      date_absence: data?.date_absence ?? "",
      heure_debut: data?.heure_debut ?? "",
      heure_fin: data?.heure_fin ?? "",
      motif: data?.motif ?? "",
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierAbsence(formData, absenceId);
    } else {
      res = await ajouterAbsence(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "L'absence a été modifiée avec succès");
      } else {
        setFormData({
          date_absence: "",
          heure_debut: "",
          heure_fin: "",
          motif: "",
        });
        toast("success", "L'absence a été ajoutée avec succès");
      }
      setErrors({
        date_absence: "",
        heure_debut: "",
        heure_fin: "",
        motif: "",
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
      <AbsencesForm
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