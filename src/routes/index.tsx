import { Outlet, useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { useUser } from "../lib/auth";

export const AppRoutes = () => {
  const user = useUser();

  const routes = user.data ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
