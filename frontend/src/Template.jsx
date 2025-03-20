import { Outlet } from "react-router-dom";
import Navbar from "./shared/components/Navbar.jsx";

function Template() {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  );
}

export default Template;
