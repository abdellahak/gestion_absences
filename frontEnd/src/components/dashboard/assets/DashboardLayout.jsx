import {
  useSidebar,
  SidebarProvider,
} from "../../../assets/sideBarContext/SideBarContext";
import { Outlet } from "react-router";
import Header from "../../header/Header";
import Backdrop from "../../sideBar/assets/Backdrop";
import Sidebar from "../../sideBar/SideBar";
import RoleWrapper from "../../../assets/wrapper/RoleWrapper";

function LayoutContent() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <Sidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <Header />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function DashboardLayout({ role }) {
  return (
      <SidebarProvider>
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </SidebarProvider>
  );
}

export default DashboardLayout;
