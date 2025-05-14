import { useAuth } from "../../assets/wrapper/AuthWrapper";
import AdminDashboard from "./adminDahsboard/AdminDashboard";
import FormateurDashboard from "./formateurDashboard/FormateurDashboard";
import StagiaireDashboard from "./stagiaireDashboard/StagaireDashboard";

export default function DashboardRouter() {
  const { auth } = useAuth();

  if (!auth) return null;

  switch (auth.role) {
    case "admin":
      return <AdminDashboard />;
    case "formateur":
      return <FormateurDashboard />;
    case "surveillantGenerale":
      return <SurvillantGeneraleDashboard />;
    case "stagiaire":
      return <StagiaireDashboard />;
    default:
      return <h1>Unauthorized</h1>;
  }
}
