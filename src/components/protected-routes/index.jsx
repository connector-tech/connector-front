import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = sessionStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
