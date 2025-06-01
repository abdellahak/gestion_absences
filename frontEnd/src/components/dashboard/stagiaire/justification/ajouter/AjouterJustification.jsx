import { useEffect, useState } from "react";
import Justification from "../assets/form/Justification";
import { getAbsencesForJustification } from "../../../../../assets/api/stagiaires/absences/absences";

export default function AjouterJustification() {
  const [absences, setAbsences] = useState([]);
  const [absencesLoading, setAbsencesLoading] = useState(false);
  useEffect(() => {
    const fetchAbsences = async () => {
      setAbsencesLoading(true);
      const res = await getAbsencesForJustification();
      if (res.success) setAbsences(res.data || []);
      setAbsencesLoading(false);
    };
    fetchAbsences();
  }, []);

  return (
    <>
      <title>Ajouter une justification</title>
      <Justification absences={absences} absencesLoading={absencesLoading} />
    </>
  );
}
