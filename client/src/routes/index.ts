import React from "react";
import { RouteObject } from "react-router-dom";
import authRoutes from "./auth";
import userRoutes from "./user";

const homeRoutes: RouteObject[] = [
  {
    path: "/",
    Component: React.lazy(() => import("../pages/Home")),
  },
  {
    path: "*",
    Component: React.lazy(() => import("../pages/NotFound")),
  },
];

const routes = [...homeRoutes, ...authRoutes, ...userRoutes];

export default routes;
