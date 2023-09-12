import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticationForm } from "./views/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hellow World!</div>,
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
