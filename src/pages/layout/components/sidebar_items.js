import AdminNavigateList from "../admin_navigate_list";
import AuthController from "@/controller/auth_controller";
export default function SidebarItems() {
  return (
    <ul>
      <li className="grid place-items-center">
        <img
          src="/images/edufar_logo.png"
          alt="my image"
          className="h-10 text-info"
        />
      </li>
      <li>
        <ul className="mt-10">
          <AdminNavigateList />
        </ul>
      </li>
    </ul>
  );
}
