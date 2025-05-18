import { RxDashboard } from "react-icons/rx";
import {
  MdCalendarToday,
  MdPerson,
  MdListAlt,
  MdTableRows,
  MdInsertDriveFile,
} from "react-icons/md";

function prefixPath(role, path) {
  if (path.startsWith("/")) path = path.slice(1);
  return `/${role}/${path}`;
}


export function getSidebarNavItems(role) {
  // const common = [
  //   {
  //     icon: <RxDashboard />,
  //     name: "Dashboard",
  //     path: prefixPath(role, "dashboard"),
  //   },
  //   {
  //     icon: <MdCalendarToday />,
  //     name: "Calendar",
  //     path: prefixPath(role, "calendar"),
  //   },
  // ];

  if (role === "admin") {
    return [
      {
        icon: <MdPerson />,
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
        icon: <MdInsertDriveFile />,
        subItems: [
          { name: "Liste des filières", path: "/admin/filieres", pro: false },
          { name: "Ajouter filière", path: "/admin/filieres/ajouter", pro: false },
        ],
      },
       {
        name: "Groupes",
        icon: <MdListAlt />,
        subItems: [
          { name: "Liste des groupes", path: "/admin/groupes", pro: false },
          { name: "Ajouter groupe", path: "/admin/groupes/ajouter", pro: false },
        ],
      },
      {
        name: "Stagiaires",
        icon: <MdPerson />,
        subItems: [
          { name: "Liste des stagiaires", path: "/admin/stagiaires", pro: false },
          { name: "Ajouter stagiaire", path: "/admin/stagiaires/ajouter", pro: false },
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
        icon: <MdPerson />,
        name: "example page",
        path: "/formateur/example_page",
      },
      {
        name: "example page",
        icon: <MdListAlt />,
        subItems: [{ name: "Form Elements", path: "/formateur/example_page3", pro: false }],
      },
      {
        name: "example page",
        icon: <MdTableRows />,
        subItems: [{ name: "example page", path: "/formateur/example_page4", pro: false }],
      },
      {
        name: "example page",
        icon: <MdInsertDriveFile />,
        subItems: [
          { name: "page 1", path: "/formateur/example_page5", pro: false },
          { name: "page 2", path: "/formateur/example_page6", pro: false },
        ],
      },
    ];
  }

  if (role === "stagiaire") {
    return [
      {
        name: "example page",
        icon: <MdTableRows />,
        subItems: [{ name: "example page", path: "/stagiaire/example_page7", pro: false }],
      },
    ];
  }

  return null;
}