import {
  useSidebar,
  SidebarProvider,
} from "../../../assets/sideBarContext/SideBarContext";
import { Outlet } from "react-router";
import Header from "../../header/Header";
import Backdrop from "../../sideBar/assets/Backdrop";
import Sidebar from "../../sideBar/SideBar";

function LayoutContent() {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex bg-gray-100">
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
        <div
          className={`p-4 md:p-6 overflow-hidden mx-auto max-w-screen-2xl ${
            isExpanded || isHovered
              ? "lg:max-w-[calc(100vw-350px)]"
              : "lg:max-w-[calc(100vw-150px)]"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function DashboardLayout({ role }) {
  return (
      <SidebarProvider>
        <LayoutContent />
      </SidebarProvider>
  );
}

export default DashboardLayout;
