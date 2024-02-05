import AdminLayout from "@/pages/layout/admin_layout";

function Home() {
  return (
    <div>
      <AdminLayout>
        <div className="grid max-h-max min-h-max grid-cols-4 gap-2 p-1">
          <div className="md:col-span-1 col-span-2  md:h-40 h-32 rounded-md bg-white shadow-sm shadow-gray-500"></div>
          <div className="md:col-span-1 col-span-2  md:h-40 h-32 rounded-md bg-white shadow-sm shadow-gray-500"></div>
          <div className="md:col-span-1 col-span-2  md:h-40 h-32 rounded-md bg-white shadow-sm shadow-gray-500"></div>
          <div className="md:col-span-1 col-span-2  md:h-40 h-32 rounded-md bg-white shadow-sm shadow-gray-500"></div>

          <div className="col-span-4 h-16 bg-white rounded-md shadow-sm shadow-gray-400 flex"></div>
        </div>
      </AdminLayout>
    </div>
  );
}
export default Home;
