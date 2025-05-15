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
  const common = [
    {
      icon: <RxDashboard />,
      name: "Dashboard",
      path: prefixPath(role, "dashboard"),
    },
    {
      icon: <MdCalendarToday />,
      name: "Calendar",
      path: prefixPath(role, "calendar"),
    },
  ];

  if (role === "admin") {
    return [
      ...common,
      {
        icon: <MdPerson />,
        name: "User Profile",
        path: "profile",
      },
      {
        name: "Forms",
        icon: <MdListAlt />,
        subItems: [{ name: "Form Elements", path: "/admin/form-elements", pro: false }],
      },
      {
        name: "Tables",
        icon: <MdTableRows />,
        subItems: [{ name: "Basic Tables", path: "/admin/basic-tables", pro: false }],
      },
      {
        name: "Pages",
        icon: <MdInsertDriveFile />,
        subItems: [
          { name: "Blank Page", path: "/admin/blank", pro: false },
          { name: "404 Error", path: "/admin/error-404", pro: false },
        ],
      },
    ];
  }

  if (role === "formateur") {
    return [
      ...common,
      {
        icon: <MdPerson />,
        name: "User Profile",
        path: "/formateur/profile",
      },
      {
        name: "Forms",
        icon: <MdListAlt />,
        subItems: [{ name: "Form Elements", path: "/formateur/form-elements", pro: false }],
      },
      {
        name: "Tables",
        icon: <MdTableRows />,
        subItems: [{ name: "Basic Tables", path: "/formateur/basic-tables", pro: false }],
      },
      {
        name: "Pages",
        icon: <MdInsertDriveFile />,
        subItems: [
          { name: "Blank Page", path: "/formateur/blank", pro: false },
          { name: "404 Error", path: "/formateur/error-404", pro: false },
        ],
      },
      // Add more items specific to formateur
    ];
  }

  if (role === "stagiaire") {
    return [
      ...common,
      // Add items specific to stagiaire
    ];
  }

  // Default for unknown roles
  return common;
}