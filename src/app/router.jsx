import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import Pulse from "../pages/Pulse.jsx";
import Community from "../pages/Community.jsx";
import Discover from "../pages/Discover.jsx";
import Profile from "../pages/Profile.jsx";
import PulseDetail from "../pages/PulseDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Pulse /> },
      { path: "pulse/:id", element: <PulseDetail /> },
      { path: "community", element: <Community /> },
      { path: "discover", element: <Discover /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);