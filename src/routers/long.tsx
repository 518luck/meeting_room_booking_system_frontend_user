import type { RouteObject } from "react-router-dom";

const longRouter: RouteObject[] = [
  {
    path: "/login",
    lazy: async () => {
      const module = await import("@/views/Login");
      return { Component: module.default };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const module = await import("@/views/Register");
      return { Component: module.default };
    },
  },
  {
    path: "/update_password",
    lazy: async () => {
      const module = await import("@/views/UpdatePassword");
      return { Component: module.default };
    },
  },
];

export default longRouter;
