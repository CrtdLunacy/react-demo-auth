import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CommandPage from "../pages/CommandPage";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Partner from "../pages/Partner";
import Registration from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/command",
    element: <CommandPage />,
  },
  {
    path: "/command/:user",
    element: <Partner />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
