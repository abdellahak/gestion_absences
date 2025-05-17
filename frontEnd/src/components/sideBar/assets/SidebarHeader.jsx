import { Link } from "react-router-dom";;
import { MdMoreHoriz } from "react-icons/md";
import Logo from "../../../assets/logo/Logo";
import { useAuth } from "../../../assets/wrapper/AuthWrapper";

export default function SidebarHeader({ isExpanded, isHovered, isMobileOpen }) {
  return (
    <div
      className={`py-8 flex ${
        !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
      }`}
    >
        {isExpanded || isHovered || isMobileOpen ? (
          <Logo imageClassName="w-16 h-9" isLink/>
        ) : (
          <Logo imageClassName="w-10 h-full" isLink/>
        )}
    </div>
  );
}

export function SidebarTitle({ isExpanded, isHovered, isMobileOpen }) {
  const { auth } = useAuth();
  return (
    <h2
      className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
        !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
      }`}
    >
      {isExpanded || isHovered || isMobileOpen ? (
        `Tableau de Bord ${auth?.role.toUpperCase()}`
      ) : (
        <MdMoreHoriz className="size-6" />
      )}
    </h2>
  );
}