import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import Pulse from "../pages/Pulse.jsx";
import PulseDetail from "../pages/PulseDetail.jsx";
import Signals from "../pages/Signals";

import GamePage from "../pages/GamePage.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import { Protected } from "../components/ui/Protected.jsx";


import Discover from "../pages/Discover.jsx";
import Profile from "../pages/Profile.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Pulse />,
      },
      {
        path: "pulse/:id",
        element: <PulseDetail />,
      },

      {
        path: "games",
        element: <GamePage />,
      },
      {
        path: "games/:id",
        element: <GamePage />,
      },

      {
        path: "discover",
        element: <Discover />,
      },

      {
        path: "profile",
        element: (<Protected>
          <Profile />
        </Protected>)
      },


      {
        path: "signals",
        element: <Signals />,
      },

      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "register",
        element: <AuthPage />
      },
    ],
  },
]);