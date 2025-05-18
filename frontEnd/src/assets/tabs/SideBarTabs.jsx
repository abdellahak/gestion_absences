import { FaChartPie, FaUserGraduate, FaUsers, FaUserTie, FaCalendarCheck, FaFileAlt, FaSchool, FaUserCircle } from "react-icons/fa";

function prefixPath(role, path) {
  if (path.startsWith("/")) path = path.slice(1);
  return `/${role}/${path}`;
}

export function getSidebarNavItems(role) {

  if (role === "admin") {
    return [
      {
        icon: <FaChartPie />,
        name: "Tableau de bord",
        path: "/admin",
      },
      {
        name: "Filières",
        icon: <FaSchool />,
        subItems: [
          { name: "Liste des filières", path: "/admin/filieres" },
          { name: "Ajouter filière", path: "/admin/filieres/ajouter" },
        ],
      },
      {
        name: "Groupes",
        icon: <FaUsers />,
        subItems: [
          { name: "Liste des groupes", path: "/admin/groupes" },
          { name: "Ajouter groupe", path: "/admin/groupes/ajouter" },
        ],
      },
      {
        name: "Stagiaires",
        icon: <FaUserGraduate />,
        subItems: [
          { name: "Liste des stagiaires", path: "/admin/stagiaires" },
          { name: "Ajouter stagiaire", path: "/admin/stagiaires/ajouter" },
        ],
      },
      {
        name: "Profile",
        icon: <FaUserCircle />,
        path: "/admin/profile",
      },
    ];
  }

  if (role === "formateur") {
    return [
      {
        icon: <FaChartPie />,
        name: "Tableau de bord",
        path: "/formateur",
      },
      {
        name: "Mes groupes",
        icon: <FaUsers />,
        subItems: [
          { name: "Liste des groupes", path: "/formateur/groupes" },
        ],
      },
      {
        name: "Mes stagiaires",
        icon: <FaUserGraduate />,
        subItems: [
          { name: "Liste des stagiaires", path: "/formateur/stagiaires" },
        ],
      },
      {
        name: "Gestion des absences",
        icon: <FaCalendarCheck />,
        subItems: [
          { name: "Ajouter absence", path: "/formateur/absences/ajouter" },
          { name: "Liste des absences", path: "/formateur/absences" },
        ],
      },
      {
        name: "Demandes d'autorisation",
        icon: <FaFileAlt />,
        subItems: [
          { name: "Liste des demandes", path: "/formateur/demandes" },
        ],
      },
      {
        name: "Profile",
        icon: <FaUserCircle />,
        path: "/formateur/profile",
      },
    ];
  }

  if (role === "surveillant") {
    return [
      {
        icon: <FaChartPie />,
        name: "Tableau de bord",
        path: "/surveillant",
      },
      {
        name: "Gestion des absences",
        icon: <FaCalendarCheck />,
        subItems: [
          { name: "Liste des absences", path: "/surveillant/absences" },
          { name: "Rapport d'absences", path: "/surveillant/absences/rapport" },
        ],
      },
      {
        name: "Demandes d'autorisation",
        icon: <FaFileAlt />,
        subItems: [
          { name: "Liste des demandes", path: "/surveillant/demandes" },
          { name: "Traiter les demandes", path: "/surveillant/demandes/traiter" },
        ],
      },
      {
        name: "Profile",
        icon: <FaUserCircle />,
        path: "/surveillant/profile",
      },
    ];
  }

  return null;
}