import { useEffect, useState } from "react";
import { useToast } from "../../../../../../assets/toast/Toast";
import GroupeForm from "./GroupeForm";
import {
  ajouterGroupe,
  modifierGroupe,
} from "../../../../../../assets/api/admin/groupe/groupe";

export default function Groupe({
  update = false,
  GroupId = null,
  data = null,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: data?.code ?? "",
    intitule: data?.intitule ?? "",
    filiere_id: data?.filiere_id ?? "",
  });
  const [errors, setErrors] = useState({
    code: "",
    intitule: "",
    filiere_id: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      code: data?.code ?? "",
      intitule: data?.intitule ?? "",
      filiere_id: data?.filiere_id ?? "",
    });
  }, [data]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    let res;
    if (update) {
      res = await modifierGroupe(formData, GroupId);
    } else {
      res = await ajouterGroupe(formData);
    }
    if (res) setLoading(false);
    if (res.success) {
      if (update) {
        toast("success", "Le groupe a été modifié avec succès");
      } else {
        setFormData({
          code: "",
          intitule: "",
          filiere_id: "",
        });
        toast("success", "Le groupe a été ajouté avec succès");
      }
      setErrors({
        code: "",
        intitule: "",
        filiere_id: "",
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
      <GroupeForm
        update={update}
        handleSubmit={handleSubmit}
        errors={errors}
        formData={formData}
        setFormData={setFormData}
        setErrors={setErrors}
      />
    </>
  );
}