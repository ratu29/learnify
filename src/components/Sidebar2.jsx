import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Users,
  User,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar2() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${
      isActive
        ? "text-white bg-[var(--color-hijau)] font-extrabold"
        : "text-[var(--color-teks-samping)] hover:text-[var(--color-hijau)] hover:bg-[var(--color-latar)] hover:font-bold"
    }`;

  const menus = [
    { label: "Dashboard", to: "/", icon: <LayoutDashboard className="text-xl" /> },
    { label: "Courses", to: "/courses", icon: <BookOpen className="text-xl" /> },
    { label: "Schedule", to: "/schedule", icon: <CalendarDays className="text-xl" /> },
    { label: "Instructors", to: "/instructors", icon: <Users className="text-xl" /> },
    // { label: "Profile", to: "/profile", icon: <User className="text-xl" /> },
    // { label: "Activity", to: "/activity", icon: <Activity className="text-xl" /> },
  ];

  return (
    <div id="sidebar" className="flex min-h-screen w-64 flex-col bg-white p-8 shadow-lg">
      {/* Logo */}
      <div id="sidebar-logo" className="mb-10">
        <h2 className="text-3xl font-extrabold text-[var(--color-teks)]">
          <span className="text-[var(--color-hijau)]">Learn</span>
          <span className="text-[var(--color-teks)]">ify</span>
        </h2>
        <p className="text-sm text-gray-400">E-Learning Admin Panel</p>
      </div>

      {/* Menu List */}
      <nav className="space-y-2">
        {menus.map((menu, i) => (
          <NavLink key={i} to={menu.to} className={menuClass}>
            {menu.icon}
            <span>{menu.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Card */}
      <div className="mt-auto bg-[var(--color-latar)] p-4 rounded-xl shadow-md mt-10 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
          alt="Medal"
          className="w-8 h-8 mx-auto mb-2"
        />
        <h3 className="text-[var(--color-teks)] font-semibold text-sm mb-1">
          Upgrade your <br /> Account to Pro
        </h3>
        <p className="text-xs text-[var(--color-teks-samping)] mb-3">
          Upgrade to premium to get premium features
        </p>
        <button className="bg-[var(--color-hijau)] text-white px-4 py-1 rounded-full text-sm">
          Upgrade
        </button>
      </div>

      {/* Footer Text */}
      <div className="text-xs text-gray-400 mt-4 text-center">
        <p className="font-bold">Learnify Dashboard</p>
        <p className="font-light">&copy; 2025 All Rights Reserved</p>
      </div>
    </div>
  );
}
