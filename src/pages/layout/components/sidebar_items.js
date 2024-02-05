import AdminNavigateList from "../admin_navigate_list";
export default function SidebarItems() {
  return (
    <>
      <ul className="mt-10">
        <AdminNavigateList />
      </ul>
      <button
        className="btn bg-white w-full flex gap-2 text-black shadow-sm shadow-gray-500"
        onClick={() => AuthController.handleLogout()}
      >
        <span className="flex-shrink flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
            />
          </svg>
        </span>
        <span className="flex flex-auto justify-center">logout</span>
      </button>
    </>
  );
}
