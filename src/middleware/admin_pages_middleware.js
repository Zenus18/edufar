import Url from "@/constant/constant_url";
import Api from "@/utils/api";
import StorageProvider from "@/utils/storage";
import { useEffect } from "react";

export const AdminPagesMiddleware = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      if (StorageProvider.isAuthenticated()) {
        const role = StorageProvider.getItem("role");
        if (role !== "admin") {
          if (role === "student") {
            window.location.href = Url.student_home;
          } else {
            window.location.href = "/";
          }
        }
      }
    }, []);

    // Pengguna sudah login, render komponen yang diminta
    return <WrappedComponent {...props} />;
  };
};

export default AdminPagesMiddleware;
