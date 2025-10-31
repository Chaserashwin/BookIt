import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Checkout from "./pages/Checkout.jsx";
import Result from "./pages/Result.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/result",
        element: <Result />,
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Your existing routes/components */}
    <ToastContainer position="top-center" autoClose={2500} />
    <RouterProvider router={appRouter} />
  </StrictMode>
);
