import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import "./index.css";
import { GamesProvider } from "./context/GamesContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
      <GamesProvider>
    <RouterProvider router={router} />
  
    </GamesProvider>
  </React.StrictMode>
);