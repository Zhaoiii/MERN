import { lazy } from "react";

export default [
  {
    path: "/user",
    name: "user",
    Component: lazy(() => import("@/pages/Profile")),
  },
];
