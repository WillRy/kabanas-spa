
import { Link, NavLink, Outlet } from "react-router";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

function AppLayout() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
       <Header />
        <main className="px-6 py-10 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
