import AuthController from "@/controller/auth_controller";
import AdminNavigateList from "./admin_navigate_list";
import AdminPagesMiddleware from "@/middleware/admin_pages_middleware";
import LayoutHeader from "./components/header_layout";
import { SidebarItem } from "flowbite-react";
import SidebarItems from "./components/sidebar_items";

function AdminLayout({ children }) {
  return (
    <div className="grid-cols-1 h-screen overflow-hidden w-full bg-[#fefefe] text-gray-800 sm:drawer">
      <div className="navbar col-span-1 md:h-20 h-16 bg-white flex justify-between border-b-2 border-gray-200">
        <LayoutHeader />
      </div>
      <div className="col-span-1 h-screen flex w-full">
        <div className="md:w-[12rem]  min-h-max border-r-2 border-gray-200 bg-white md:block hidden  pt-4 px-2">
          <SidebarItems />
        </div>
        <div className="md:min-w-max w-full min-h-max overflow-y-scroll md:p-2 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
export default AdminPagesMiddleware(AdminLayout);
