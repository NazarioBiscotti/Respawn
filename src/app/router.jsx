import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import Pulse from "../pages/Pulse.jsx";
import PulseDetail from "../pages/PulseDetail.jsx";

import GamesPage from "../pages/GamePage.jsx";
import GamePage from "../pages/GamePage.jsx";

import Community from "../pages/Community.jsx";
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
        element: <GamesPage />,
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
        path: "community",
        element: <Community />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);