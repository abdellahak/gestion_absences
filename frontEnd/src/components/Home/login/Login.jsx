import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import LoginBanner from "./LoginBanner";
import { useNavigate, useSearchParams } from "react-router-dom";
import Auth from "../../../assets/api/auth/Auth";
import { useAuth } from "../../../assets/wrapper/AuthWrapper";

export default function Login() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth]);
  const [info, setInfo] = useState({
    identifiant: "",
    password: "",
  });
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({
    identifiant: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await Auth.Login(info);
    if (res.success) {
      const redirect = searchParams.get("redirect");
      if (redirect) {
        navigate(decodeURIComponent(redirect));
      }
      navigate(0);
    } else {
      setErrors(res.errors);
    }
  };

  return (
    <div className="size-full">
      <title>Connexion</title>
      <div className="relative p-6 bg-white z-1 sm:p-0">
        <div className="relative flex flex-col justify-center w-full h-screen sm:p-0 lg:flex-row">
          {/* form */}
          <LoginForm
            errors={errors}
            handleChange={handleChange}
            info={info}
            handleSubmit={handleSubmit}
          />
          <LoginBanner />
        </div>
      </div>
    </div>
  );
}
