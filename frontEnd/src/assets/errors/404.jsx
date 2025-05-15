import { useNavigate } from "react-router-dom";
import { useAuth } from "../wrapper/AuthWrapper";
import { Link } from "react-router-dom";

export default function Not_found({ className }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    if (!auth) return "/";
    switch (auth.role) {
      case "admin":
        return "/admin";
      case "stagiaire":
        return "/stagiaire";
      case "formateur":
        return "/formateur";
      case "surveillant":
        return "/surveillant";
      default:
        return "/";
    }
  };

  return (
    <div
      className={`w-full min-h-[80vh] flex items-center justify-center bg-gray-50 ${className}`}
    >
      <div className="bg-white shadow-theme-lg rounded-2xl flex flex-col items-center justify-center px-10 py-16 gap-8 max-w-lg w-full">
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-7xl font-bold text-brand-500 drop-shadow-lg">
            404
          </h4>
          <p className="text-2xl font-semibold text-gray-700">
            Page non trouvée
          </p>
          <p className="text-gray-500 text-center max-w-xs">
            Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <data className="flex gap-4">
          <Link
            to={getDashboardPath()}
            className="mt-4 px-8 py-3 rounded-lg bg-brand-500 text-white font-medium text-lg shadow-theme-md hover:bg-brand-600 active:scale-95 transition-all duration-200"
          >
            Accueil
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-8 py-3 rounded-lg border border-brand-600 text-brand-600 font-medium text-lg shadow-theme-md hover:bg-brand-600 hover:text-white active:scale-95 transition-all duration-200"
          >
            Retour
          </button>
        </data>
      </div>
    </div>
  );
}
