import { useState } from "react";
import PasswordForm from "./assets/PasswordForm";
import { updatePassword } from "../../../../../assets/api/profile/profile";
import { useToast } from "../../../../../assets/toast/Toast";

export default function ChangePassword() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (buttonLoading) return;

    // Basic validation
    if (!passwordData.current_password || !passwordData.new_password || !passwordData.new_password_confirmation) {
      setErrors({
        current_password: !passwordData.current_password ? "Le mot de passe actuel est requis" : "",
        new_password: !passwordData.new_password ? "Le nouveau mot de passe est requis" : "",
        new_password_confirmation: !passwordData.new_password_confirmation ? "La confirmation du nouveau mot de passe est requise" : "",
      });
      toast("error", "Tous les champs sont requis");
      return;
    }

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setErrors(prev => ({ ...prev, new_password_confirmation: "Les mots de passe ne correspondent pas" }));
      return;
    }

    setButtonLoading(true);
    const res = await updatePassword(passwordData);
    if (res) setButtonLoading(false);
    
    if (res.success) {
      toast("success", "Votre mot de passe a été modifié avec succès");
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setErrors({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } else {
      if (res.server) {
        return toast("error", res.server);
      }
      toast("error", "Les informations ne sont pas complètes");
      setErrors(res.errors);
    }
  };

  return (
    <PasswordForm
      passwordData={passwordData}
      setPasswordData={setPasswordData}
      errors={errors}
      setErrors={setErrors}
      handleSubmit={handleSubmit}
      buttonLoading={buttonLoading}
    />
  );
}