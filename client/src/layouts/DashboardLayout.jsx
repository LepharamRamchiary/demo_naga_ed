import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Users,
} from "lucide-react";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/dashboard/profile", icon: User },
    { name: "Users", path: "/dashboard/users", icon: Users },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-ink">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button - Vertically Centered on the edge */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-chili text-white rounded-full p-1 shadow-lg border-2 border-white hover:scale-110 transition-transform z-50"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        {/* Sidebar Header / Logo */}
        <div className="h-20 flex items-center px-6">
          <div className="w-8 h-8 bg-chili rounded-lg shrink-0 flex items-center justify-center font-bold text-white">
            D
          </div>
          <span
            className={`ml-3 font-bold text-xl tracking-tight transition-opacity duration-300 ${!isSidebarOpen && "opacity-0 overflow-hidden"}`}
          >
            DemoEdu
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 px-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center h-12 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-chili text-white shadow-md shadow-chili/20"
                    : "text-smoke hover:bg-slate-50 hover:text-ink"
                }`
              }
            >
              {/* Icon Container - Fixed width prevents jumping */}
              <div className="w-14 shrink-0 flex items-center justify-center">
                <item.icon size={22} />
              </div>

              {/* Label - Hidden when collapsed */}
              <span
                className={`font-medium whitespace-nowrap transition-all duration-300 ${
                  isSidebarOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 pointer-events-none"
                }`}
              >
                {item.name}
              </span>

              {/* Tooltip for collapsed state */}
              {!isSidebarOpen && (
                <div className="absolute left-16 bg-ink text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout at bottom */}
        <div className="absolute bottom-6 w-full px-3">
          <button
            onClick={logout}
            className="flex items-center h-12 w-full text-smoke hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
          >
            <div className="w-14 shrink-0 flex items-center justify-center">
              <LogOut size={22} />
            </div>
            <span
              className={`font-medium whitespace-nowrap transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 overflow-hidden"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* --- NAVBAR --- */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          {/* Left side of Navbar (Search or Title) */}
          <div className="relative w-64 hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-chili/20 outline-none"
            />
          </div>

          {/* Right side of Navbar */}
          <div className="flex items-center gap-6">
            <button className="p-2 text-smoke hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-chili rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-ink leading-tight">
                  {user?.username || "Learner"}
                </p>
                <p className="text-[11px] font-medium text-smoke uppercase tracking-wider italic">
                  Student Account
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-chili to-red-700 flex items-center justify-center text-white font-bold shadow-lg shadow-chili/30">
                {user?.username?.charAt(0).toUpperCase() || "L"}
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <main className="p-8">
          <div className="">
            {/* The Outlet renders the sub-pages */}
            <div className="bg-white rounded p-8 shadow-sm border border-slate-200 min-h-[calc(100vh-160px)]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
