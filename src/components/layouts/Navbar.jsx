import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base =
    "px-3 py-2 rounded-md text-sm font-medium transition";

  const active =
    "bg-white text-black";
  const inactive =
    "text-gray-300 hover:text-white hover:bg-gray-800";

  return (
    <nav className="flex gap-2 p-4 bg-black border-b border-gray-800">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        Pulse
      </NavLink>

      <NavLink
        to="/community"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        Community
      </NavLink>

      <NavLink
        to="/discover"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        Discover
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${base} ${isActive ? active : inactive}`
        }
      >
        Profile
      </NavLink>
    </nav>
  );
}