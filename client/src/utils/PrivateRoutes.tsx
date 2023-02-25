import { useAppSelector, useAppDispatch } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { token } = useAppSelector((state) => state.users);
  return token ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoutes;
