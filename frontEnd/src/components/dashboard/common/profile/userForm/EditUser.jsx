import { useEffect, useState } from "react";
import UserForm from "./assets/UserForm";
import {
  getProfile,
  updateProfile,
} from "../../../../../assets/api/profile/profile";
import Loading from "../../../../../assets/loading/Loading";
import { useToast } from "../../../../../assets/toast/Toast";
export default function EditUser() {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    telephone: "",
    adresse: "",
    sexe: "",
    date_naissance: "",
    lieu_naissance: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    telephone: "",
    adresse: "",
    sexe: "",
    date_naissance: "",
    lieu_naissance: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (res) setLoading(false);
      if (res.success) {
        setData({
          email: res.data?.email ?? "",
          telephone: res.data?.telephone ?? "",
          adresse: res.data?.adresse ?? "",
          sexe: res.data?.sexe ?? "",
          date_naissance: res.data?.date_naissance ?? "",
          lieu_naissance: res.data?.lieu_naissance ?? "",
        });
      } else {
        toast("error", res.error);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    if (loading || buttonLoading) return;
    setButtonLoading(true);
    let res = await updateProfile(data);
    if (res) setButtonLoading(false);
    if (res.success) {
      toast("success", "votre profil a été modifié avec succès");
      setErrors({
        email: "",
        telephone: "",
        adresse: "",
        sexe: "",
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
      {!loading ? (
        <UserForm
          data={data}
          setData={setData}
          errors={errors}
          setErrors={setErrors}
          handleSubmit={handleSubmit}
          buttonLoading={buttonLoading}
        />
      ) : (
        <div className="flex justify-center items-center size-full">
          <div className="">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}
