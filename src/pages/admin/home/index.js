import AdminLayout from "@/pages/layout/admin_layout";
import StorageProvider from "@/utils/storage";
import { useEffect, useState } from "react";
import NetworkApi from "@/utils/axios";
import AuthController from "@/controller/auth_controller";
import { ProgressCard } from "@/components/dashboard/progress_card";
import { data } from "autoprefixer";
function Home() {
  const [Data, setData] = useState([]);
  const [Profile, setProfile] = useState(null);
  useEffect(() => {
    NetworkApi.get("/api/progress/get")
      .then((response) => {
        setData(response.data.progress);
        console.log(response.data.progress);
      })
      .catch((error) => {
        console.error(error);
      });
    NetworkApi.get("/api/admin/get-profile")
      .then((response) => {
        setProfile(response.data.user);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="grid max-h-max min-h-max grid-cols-4 gap-4 p-1">
          <div className="col-span-4 h-32  rounded-md shadow-sm shadow-[#FFD6E0] flex   bg-[#3A606E] text-white">
            <div className="flex-1 md:p-8 p-3">
              <h1 className="text-xl font-bold ">
                Welcome, {Profile.username}
              </h1>
              <p className="mt-2 md:mt-4">
                selamat datang di admin page, selamat menjalankan aktifitas
                dengan lancar
              </p>
            </div>
            <div className="flex-shrink my-auto p-1">
              <img src="/images/morning.svg" className="h-16 md:h-28" />
            </div>
          </div>
          {Data.map((progressData, index) => {
            return <ProgressCard key={index} data={progressData} />;
          })}

          <div className="md:col-span-1 col-span-2  md:h-40 h-32 rounded-md bg-[#FFEBF0] shadow-sm text-[#A30029] shadow-gray-500 md:p-8 p-4">
            <h1 className="font-bold text-6xl w-full text-center mb-2">2</h1>
            <p className="font-mono text-xl w-full text-center mt-2">report</p>
          </div>

          <div className="col-span-4 h-16 bg-white rounded-md shadow-sm shadow-gray-400 flex"></div>

          <div className="col-span-4 h-56 bg-white rounded-md shadow-sm shadow-gray-400 flex"></div>
        </div>
      </AdminLayout>
    </div>
  );
}
export default Home;
