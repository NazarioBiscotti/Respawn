import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import "./index.css";
// import { GamesProvider } from "./context/GamesContext";
import { UserProvider } from "./context/UserContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      {/* <GamesProvider> */}
        <RouterProvider router={router} />
      {/* </GamesProvider> */}
    </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);