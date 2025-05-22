import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Users,
  User,
  Activity,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen px-6 py-8 flex flex-col justify-between shadow-md">
      <div>
        {/* Logo */}
        <h2 className="text-2xl font-[var(--font-poppins-extrabold)] mb-10 text-[var(--color-teks)]">
          <span className="text-[var(--color-hijau)]">Learn</span>
          <span className="text-[var(--color-teks)]">ify</span>
        </h2>

        {/* Menu */}
        <nav className="flex flex-col space-y-4">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" />
          <SidebarItem
            icon={<BookOpen />}
            label="Courses"
            active
          />
          <SidebarItem icon={<CalendarDays />} label="Schedule" />
          <SidebarItem icon={<Users />} label="Instructors" />
          <SidebarItem icon={<User />} label="Profile" />
          <SidebarItem icon={<Activity />} label="Activity" />
        </nav>
      </div>

      {/* Upgrade Box */}
      <div className="bg-[var(--color-latar)] p-4 rounded-xl text-center mt-6 shadow-sm">
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
    </aside>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
      active
        ? "bg-[var(--color-hijau)] text-white"
        : "text-[var(--color-teks-samping)] hover:bg-[var(--color-latar)]"
    }`}
  >
    <span className="w-5 h-5">{icon}</span>
    {label}
  </div>
);

export default Sidebar;
