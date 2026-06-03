import { NavLink } from "react-router-dom";
import Container from "../ui/Container";

export default function Navbar() {
  const links = [
    { to: "/", label: "Pulse" },
    { to: "/signals", label: "Signals" },
    { to: "/discover", label: "Discover" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(124,58,237,0.7)]" />
            <span className="text-sm font-semibold tracking-tight">
              RESPawn
            </span>
          </div>

          {/* NAV */}
          <nav className="flex items-center gap-1 rounded-full border border-border bg-surface/70 p-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `
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
                  `
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="text-xs text-muted">
            Gaming culture feed
          </div>

        </div>
      </Container>
    </header>
  );
}

