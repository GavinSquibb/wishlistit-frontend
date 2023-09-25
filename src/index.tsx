import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticationForm } from "./components/Login/Login";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { CreateWishList } from "./components/CreateWishList/CreateWishList";
import { MantineProvider } from "@mantine/core";
import { WishListDetail } from "./components/WishListDetail/WishListDetail";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthenticationForm />,
  },
  {
    path: "/",
    element: (
      <>
        <AppHeader />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/create",
    element: (
      <>
        <AppHeader />
        <CreateWishList />
      </>
    ),
  },
  {
    path: "/wishlist/:id",
    element: (
      <>
        <AppHeader />
        <WishListDetail />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider theme={{ primaryColor: "red" }}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
