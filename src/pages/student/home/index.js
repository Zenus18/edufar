import NetworkApi from "@/utils/axios";
import { useState, useEffect } from "react";
import StudentPagesMiddleware from "@/middleware/student_pages_middleware";
import AuthController from "@/controller/auth_controller";

function Home() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    NetworkApi.get("/api/category/get")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <button
      className="btn btn-circle btn-info"
      onClick={AuthController.handleLogout}
    >
      logout
    </button>
  );
}
export default StudentPagesMiddleware(Home);
