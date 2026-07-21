import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Dropdown from "../Dropdown";

export default function Navbar() {
  const { user } = useUser();

  const links = [
    { to: "/", label: "Pulse" },
    { to: "signals", label: "Signals" },
    { to: "/discover", label: "Discover" },
    { to: "profile", label: "Profile" },
  ];

  const username =
    user?.user_metadata?.username ||
    user?.email?.split("@")[0];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(124,58,237,0.7)]" />
            <span className="text-sm font-semibold tracking-tight">
              RESPawn
            </span>
          </div>

          {/* NAV */}
          <nav className="flex items-center gap-1 rounded-full border border-border bg-surface/70 p-1 overflow-x-auto">
       {links.map((link) => {
  const hideOnMobile =
    link.to === "signals" || link.to === "profile";

  return (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) => `
        ${hideOnMobile ? "hidden md:block" : ""}
        rounded-full
        px-4
        py-1.5
        text-sm
        font-medium
        transition-all
        duration-200
        ${
          isActive
            ? "bg-white text-black"
            : "text-muted hover:text-white"
        }
      `}
    >
      {link.label}
    </NavLink>
  );
})}
          </nav>

          {/* USER */}
      <div className="flex items-center gap-2">
  {user && (
    <>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white mx-5">
        {username?.toUpperCase()}
      </div>

    </>
  )}
      <div>
        <Dropdown />
      </div>
</div>
        </div>
      </div>
    </header>
  );
}