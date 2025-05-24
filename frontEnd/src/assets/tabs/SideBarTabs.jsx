import { FaChartPie, FaUserGraduate, FaUsers, FaUserTie,FaBell, FaCalendarCheck, FaFileAlt, FaSchool, FaUserCircle } from "react-icons/fa";
import { MdListAlt, MdTableRows,MdCalendarToday } from "react-icons/md";


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
        name: "Formateurs",
        icon: <MdListAlt />,
        subItems: [
          { name: "Liste des Formateurs", path: "/admin/formateurs", pro: false },
          { name: "Ajouter formateur", path: "/admin/formateurs/ajouter", pro: false },
        ],
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
        name: "Surveillants généraux",
        icon: <MdPerson />,
        subItems: [
          { name: "Liste des surveillants", path: "/admin/surveillants", pro: false },
          { name: "Ajouter surveillant", path: "/admin/surveillants/ajouter", pro: false },
        ],
      },
      {
        name: "example page",
        icon: <MdListAlt />,
        subItems: [{ name: "page 1", path: "/admin/example_page1", pro: false }],
      },
      {
        name: "example page",
        icon: <MdTableRows />,
        subItems: [{ name: "page 2", path: "/admin/example_page2", pro: false }],
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
        name: "Groupes",
        icon: <FaUsers />,
        subItems: [
          { name: "Liste des groupes", path: "/surveillant/groupes" },
          { name: "Ajouter groupe", path: "/surveillant/groupes/ajouter" },
        ],
      },
      {
        name: "Filières",
        icon: <FaSchool />,
        subItems: [
          { name: "Liste des filieres", path: "/surveillant/filieres" },
          
        ],
      },
      {
        name: "Stagiaires",
        icon: <FaUserGraduate />,
        subItems: [
          { name: "Liste des stagiaires", path: "/surveillant/stagiaires" },
          { name: "Ajouter stagiaire", path: "/surveillant/stagiaires/ajouter" },
          
        ],
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

  
  if (role === "stagiaire") {
    return [
      {
        icon: <FaChartPie />,
        name: "Tableau de bord",
        path: "/stagiaire",
      },
      {
        name: "Mes absences",
        icon: <FaCalendarCheck />,
        subItems: [
          { name: "Liste des absences", path: "/stagiaire/absences" },
        ],
      },
      {
        name: "Justifications",
        icon: <FaFileAlt />,
        subItems: [
          { name: "Mes justifications", path: "/stagiaire/justifications" },
          { name: "Nouvelle justification", path: "/stagiaire/justifications/ajouter" },
        ],
      },
      {
        name: "Avertissements",
        icon: <FaBell />,
        subItems: [
          { name: "Mes avertissements", path: "/stagiaire/avertissements" },
        ],
      },
      {
        name: "Demandes d'autorisation",
        icon: <FaFileAlt />,
        subItems: [
          { name: "Mes demandes", path: "/stagiaire/demandes" },
          { name: "Nouvelle demande", path: "/stagiaire/demandes/ajouter" },
        ],
      },
      {
        name: "Profile",
        icon: <FaUserCircle />,
        path: "/stagiaire/profile",
      },
    ];
  }

  return null;
}