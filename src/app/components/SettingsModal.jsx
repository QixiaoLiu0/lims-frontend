import { useState } from "react";
import {
  X,
  Settings as SettingsIcon,
  Building2,
  Users,
  TestTube,
} from "lucide-react";

import { useUser } from "@/app/contexts/UserContext";
import { useTheme } from "@/app/contexts/ThemeContext";
import ManageTestTypesModal from "./ManageTestTypesModal";
import GeneralSettingsTab from "./Settings/GeneralSettingsTab";
import UserManagementTab from "./Settings/UserManagementTab";

export default function SettingsModal({ isOpen, onClose }) {
  const { user } = useUser();
  const { toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  const [generalSettings, setGeneralSettings] = useState({
    labName: "Water Testing Lab",
    email: "contact@waterlab.com",
    phone: "+1 (555) 123-4567",
    address: "123 Laboratory Street, Science City, SC 12345",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    autoBackup: true,
    emailNotifications: true,
  });

  if (!isOpen) return null;

  const handleGeneralSettingsSave = () => {
    alert("Settings saved successfully!");
  };

  // input classes
  const inputCls = `w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-colors placeholder-slate-400 dark:placeholder-slate-500`;

  const safeRole = user?.role?.toUpperCase() || "STAFF";
  const canManageUsers = safeRole === "SUPER_ADMIN";
  const canManageTestTypes = safeRole === "SUPER_ADMIN" || safeRole === "ADMIN";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900 dark:bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-lg shadow-sm border border-blue-500/30">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight leading-tight">
                Settings
              </h2>
              <p className="text-sm font-medium text-slate-400 mt-0.5 leading-tight">
                Manage system configuration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-900/50 shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "general"
                  ? "border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Building2 className="w-4 h-4" />
              General
            </button>
            {canManageUsers && (
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "users"
                    ? "border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <Users className="w-4 h-4" />
                User Management
              </button>
            )}
            {canManageTestTypes && (
              <button
                onClick={() => setActiveTab("testTypes")}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "testTypes"
                    ? "border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <TestTube className="w-4 h-4" />
                Test Types
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-grid-pattern">
          {activeTab === "general" && (
            <GeneralSettingsTab
              generalSettings={generalSettings}
              setGeneralSettings={setGeneralSettings}
              handleGeneralSettingsSave={handleGeneralSettingsSave}
              inputCls={inputCls}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          )}

          {activeTab === "users" && canManageUsers && (
            <UserManagementTab inputCls={inputCls} />
          )}

          {activeTab === "testTypes" && canManageTestTypes && (
            <div className="space-y-4">
              <ManageTestTypesModal canEdit={canManageTestTypes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
