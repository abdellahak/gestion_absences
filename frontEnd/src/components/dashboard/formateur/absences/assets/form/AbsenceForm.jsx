import { useEffect, useState } from "react";
import { getFormateurGroupes } from "../../../../../../assets/api/formateur/formateur groupes/formateurGroupes";
import { getFormateurStagiaires } from "../../../../../../assets/api/formateur/formateur stagiaires/formateurStagiaires";
import TimeSlotSelector from "./TimeSlotSelector";
import GroupAndSearchSelector from "./GroupAndSearchSelector";
import StagiaireTable from "./StagiaireTable";
import SubmitButton from "./SubmitButton";

export default function AbsenceForm({
  handleSubmit,
  errors,
  formData,
  setFormData,
  setErrors,
  loading,
}) {
  const [groupes, setGroupes] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState("");
  const [stagiaires, setStagiaires] = useState([]);
  const [selectedStagiaires, setSelectedStagiaires] = useState(
    formData.stagiaires || []
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [search, setSearch] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [otherDebut, setOtherDebut] = useState("");
  const [otherFin, setOtherFin] = useState("");

  useEffect(() => {
    const fetchGroupes = async () => {
      const res = await getFormateurGroupes();
      if (res.success) setGroupes(res.data);
    };
    fetchGroupes();
  }, []);
  useEffect(() => {
    const fetchStagiaires = async () => {
      const res = await getFormateurStagiaires(selectedGroupe);
      if (res.success) setStagiaires(res.data.data || []);
      else setStagiaires([]);
    };
    if (selectedGroupe) fetchStagiaires();
    else setStagiaires([]);
  }, [selectedGroupe]);

  useEffect(() => {
    if (showOther) {
      setFormData({
        ...formData,
        heure_debut: otherDebut,
        heure_fin: otherFin,
      });
    } else {
      setFormData({
        ...formData,
        stagiaires: selectedStagiaires,
        heure_debut: selectedTime.split("-")[0] || "",
        heure_fin: selectedTime.split("-")[1] || "",
      });
    }
  }, [selectedStagiaires, selectedTime, showOther, otherDebut, otherFin]);

  const handleStagiaireCheck = (id) => {
    setSelectedStagiaires((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStagiaires.length === stagiaires.length) {
      setSelectedStagiaires([]);
    } else {
      setSelectedStagiaires(stagiaires.map((s) => s.id));
    }
  };

  const filteredStagiaires = stagiaires.filter((stagiaire) => {
    const nom = stagiaire.user?.nom?.toLowerCase() || "";
    const prenom = stagiaire.user?.prenom?.toLowerCase() || "";
    const email = stagiaire.user?.email?.toLowerCase() || "";
    const numero = stagiaire.numero_inscription?.toLowerCase() || "";
    const q = search.toLowerCase();
    return (
      nom.includes(q) ||
      prenom.includes(q) ||
      email.includes(q) ||
      numero.includes(q)
    );
  });

  return (
    <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Ajouter une absence
      </h2>
      <div className="space-y-6 mb-6">
        <div className="rounded border border-gray-200 bg-white">
          <div className="border-t border-gray-100 p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <TimeSlotSelector
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                showOther={showOther}
                setShowOther={setShowOther}
                otherDebut={otherDebut}
                setOtherDebut={setOtherDebut}
                otherFin={otherFin}
                setOtherFin={setOtherFin}
                errors={errors}
              />

              <GroupAndSearchSelector
                groupes={groupes}
                selectedGroupe={selectedGroupe}
                setSelectedGroupe={setSelectedGroupe}
                search={search}
                setSearch={setSearch}
                loading={loading}
              />

              <StagiaireTable
                selectedGroupe={selectedGroupe}
                filteredStagiaires={filteredStagiaires}
                stagiaires={stagiaires}
                selectedStagiaires={selectedStagiaires}
                handleStagiaireCheck={handleStagiaireCheck}
                handleSelectAll={handleSelectAll}
                errors={errors}
              />

              <p className="text-red-500 text-md break-words h-[20px] px-4">
                {errors.stagiaires}
              </p>

              <div>
                <SubmitButton loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
