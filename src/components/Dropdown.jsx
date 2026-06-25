import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { signOut } from "../services/authService";

export default function Dropdown() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // CLICK OUTSIDE HANDLER
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-2xl" ref={dropdownRef}>
      {/* BUTTON */}
      <button onClick={() => setOpen((prev) => !prev)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-lg z-50 overflow-hidden">
          <div className="py-1 text-sm text-gray-300">

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-white/5 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-white/5 hover:text-white"
            >
              Register
            </Link>

            <hr className="border-white/10 my-1" />

            {user && (
              <div className="flex">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="w-1/2 text-center px-2 py-2 hover:bg-white/5 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  to="/signals"
                  onClick={() => setOpen(false)}
                  className="w-1/2 text-center px-2 py-2 hover:bg-white/5 hover:text-white"
                >
                  Signals
                </Link>

                <button
                  onClick={async () => {
                    await signOut();
                    setOpen(false);
                    navigate("/");
                  }}
                  className="w-1/2 px-2 py-2 hover:bg-white/5 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}


