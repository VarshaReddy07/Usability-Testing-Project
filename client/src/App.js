import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Men from "./pages/Men"
import Women from "./pages/Women"
import Orders from "./pages/Orders"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/Api";
import { Login } from "./pages/Login";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const NotFound = () => {
  // Redirect to the home page
  window.location.replace("/");
  return null; // This component doesn't render anything, as the redirection is immediate
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/men",
        element: <Men />,
        loader: productsData,
      },
      {
        path:"/women",
        element: <Women />,
        loader: productsData,
      },
      {
        path:"/orders",
        element: <Orders />,
        loader: productsData,
      },
      // Catch-all route for non-existing paths
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
