import { useAuth } from "../../assets/wrapper/AuthWrapper"; 
import Login from "./login/Login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      if (auth.role === "admin") {
        navigate("/admin");
      } else if (auth.role === "stagiaire") {
        navigate("/stagiaire");
      } else if (auth.role === "formateur") {
        navigate("/formateur");
      } else if (auth.role === "surveillant") {
        navigate("/surveillant");
      }
    }
  }, [auth, navigate]);

  if (!auth) return <Login />;
  return null;
}