import { Settings, LogOut } from "lucide-react";
import { useUser } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function Header({
  title,
  subtitle,
  icon: Icon,
  onSettingsClick,
}) {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-[#1c1f26] border-b border-slate-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#ffb800] p-3 rounded-lg">
              <Icon className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {title}
              </h1>
              <p className="text-sm text-gray-300 font-medium">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <>
                <div className="text-right">
                  <p className="text-sm text-white">Welcome, {user.email}</p>
                  <p className="text-base font-medium text-white">
                    {user.role === "STAFF"
                      ? "Staff"
                      : user.role === "ADMIN"
                        ? "Admin"
                        : "Super Admin"}
                  </p>
                </div>
                {onSettingsClick && (
                  <button
                    onClick={onSettingsClick}
                    className="p-2 text-white hover:bg-slate-600 rounded-lg transition"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-white hover:bg-slate-600 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
