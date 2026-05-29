import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";


export default function App() {
  return (
    <div>

      <Navbar />
      <Outlet />

    </div>
  );
}