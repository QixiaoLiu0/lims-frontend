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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500 p-2.5 rounded-lg shadow-sm border border-yellow-600/20">
              <Icon className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <>
                <div className="text-right hidden sm:block mr-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight mb-0.5">
                    Welcome, {user.email}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                    {user.role === "STAFF"
                      ? "Staff"
                      : user.role === "ADMIN"
                        ? "Admin"
                        : "Super Admin"}
                  </p>
                </div>

                {/* chat box entrance */}
                <button
                  onClick={pushChatBox}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="AI Assistant"
                >
                  <Bot className="w-5 h-5" />
                </button>

                {onSettingsClick && (
                  <button
                    onClick={onSettingsClick}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors ml-1"
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
