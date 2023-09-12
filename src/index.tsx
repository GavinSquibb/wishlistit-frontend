import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticationForm } from "./views/Login";
import { AppHeader } from "./components/AppHeader/AppHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHeader></AppHeader>,
  },
  {
    path: "/login",
    element: <AuthenticationForm />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
