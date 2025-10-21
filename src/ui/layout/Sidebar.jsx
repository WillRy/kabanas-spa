import {
  CalendarDaysIcon,
  CalendarIcon,
  CastleIcon,
  CogIcon,
  HomeIcon,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";
function Sidebar() {
  return (
    <div className="w-[260px] flex flex-col bg-white border-r border-slate-100 overflow-auto py-8 px-6 gap-8">
      <div>
        <img
          src="/logo2.png"
          alt=""
          className="h-24 mx-auto w-auto max-w-full"
        />
      </div>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={
              "flex items-center gap-3 py-3 px-6 hover:bg-gray-100 rounded-sm transition-colors group aria-[current=page]:bg-gray-100"
            }
          >
            <HomeIcon className="group-hover:text-indigo-600 group-aria-[current=page]:text-indigo-600" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookings"
            className={
              "flex items-center gap-3 py-3 px-6 hover:bg-gray-100 rounded-sm transition-colors group aria-[current=page]:bg-gray-100"
            }
          >
            <CalendarDaysIcon className="group-hover:text-indigo-600 group-aria-[current=page]:text-indigo-600" />
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/properties"
            className={
              "flex items-center gap-3 py-3 px-6 hover:bg-gray-100 rounded-sm transition-colors group aria-[current=page]:bg-gray-100"
            }
          >
            <CastleIcon className="group-hover:text-indigo-600 group-aria-[current=page]:text-indigo-600" />
            Properties
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/users"
            className={
              "flex items-center gap-3 py-3 px-6 hover:bg-gray-100 rounded-sm transition-colors group aria-[current=page]:bg-gray-100"
            }
          >
            <Users className="group-hover:text-indigo-600 group-aria-[current=page]:text-indigo-600" />
            Users
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/settings"
            className={
              "flex items-center gap-3 py-3 px-6 hover:bg-gray-100 rounded-sm transition-colors group aria-[current=page]:bg-gray-100"
            }
          >
            <Settings className="group-hover:text-indigo-600 group-aria-[current=page]:text-indigo-600" />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
