import { RouteObject } from "react-router-dom";
import Home from "../pages/home";

const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export { routesConfig };
