import React from "react";

export default [
  {
    path: "/login",
    name: "login",
    Component: React.lazy(() => import("@/pages/Login")),
  },
  {
    path: "/register",
    name: "register",
    Component: React.lazy(() => import("@/pages/Register")),
  },
];
