import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Briefcase, Users, UserCheck, Settings, HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const sidebarItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard, roles: ["farmer"] },
  { name: "Learning Center", path: "/learning", icon: BookOpen, roles: ["farmer", "expert"] },
  { name: "Opportunities", path: "/opportunities", icon: Briefcase, roles: ["farmer"] },
  { name: "Community", path: "/community", icon: Users, roles: ["farmer", "expert"] },
  { name: "Expert Portal", path: "/experts", icon: UserCheck, roles: ["expert"] },
  { name: "Admin Dashboard", path: "/admin", icon: LayoutDashboard, roles: ["admin"] },
  { name: "Settings", path: "/settings", icon: Settings, roles: ["farmer", "expert", "admin"] },
  { name: "Help Center", path: "/help", icon: HelpCircle, roles: ["farmer", "expert", "admin"] },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className="hidden w-64 flex-col border-r border-stone-200 bg-white lg:flex h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex flex-1 flex-col gap-2 p-4">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-stone-900",
              location.pathname === item.path
                ? "bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                : "text-stone-600"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-stone-200 p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-stone-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
