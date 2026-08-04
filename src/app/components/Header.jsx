import { Settings, LogOut, Bot } from "lucide-react";
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

  const pushChatBox = () => {
    router.push("/chat-box");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-yellow-500 p-2 sm:p-2.5 rounded-lg shadow-sm border border-yellow-600/20 shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
                {title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right Side */}
          {user && (
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Mobile role badge */}
              <div className="md:hidden">
                <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                  {user.role === "STAFF"
                    ? "Staff"
                    : user.role === "ADMIN"
                      ? "Admin"
                      : "Super Admin"}
                </span>
              </div>

              {/* Desktop user info */}
              <div className="hidden md:block text-right mr-2 max-w-xs">
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Welcome, {user.email}
                </p>

                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {user.role === "STAFF"
                    ? "Staff"
                    : user.role === "ADMIN"
                      ? "Admin"
                      : "Super Admin"}
                </p>
              </div>

              {/* AI Assistant */}
              <button
                onClick={pushChatBox}
                className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="AI Assistant"
              >
                <Bot className="w-5 h-5" />
              </button>

              {/* Settings */}
              {onSettingsClick && (
                <button
                  onClick={onSettingsClick}
                  className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
