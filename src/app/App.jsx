import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";





export default function App() {

  
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <Outlet />
    </div>
  );
}


