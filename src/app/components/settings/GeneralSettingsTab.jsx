import React from "react";
import { Sun, Moon } from "lucide-react";

export default function GeneralSettingsTab({
  generalSettings,
  setGeneralSettings,
  handleGeneralSettingsSave,
  inputCls,
  isDark,
  toggleTheme,
}) {
  return (
    <div className="space-y-6">
      {/* Appearance */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-5 text-lg leading-tight">
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-1">
              Theme
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal">
              Switch between light and dark mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              isDark
                ? "bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
                : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
            }`}
          >
            {isDark ? (
              <>
                <Moon className="w-4 h-4 text-blue-400" /> Dark Mode
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-yellow-500" /> Light Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Laboratory Information */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-5 text-lg leading-tight">
          Laboratory Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
              Laboratory Name
            </label>
            <input
              type="text"
              value={generalSettings.labName}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  labName: e.target.value,
                })
              }
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
              Contact Email
            </label>
            <input
              type="email"
              value={generalSettings.email}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  email: e.target.value,
                })
              }
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
              Phone Number
            </label>
            <input
              type="tel"
              value={generalSettings.phone}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  phone: e.target.value,
                })
              }
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
              Timezone
            </label>
            <select
              value={generalSettings.timezone}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  timezone: e.target.value,
                })
              }
              className={inputCls}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
              Address
            </label>
            <textarea
              value={generalSettings.address}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  address: e.target.value,
                })
              }
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-5 text-lg leading-tight">
          System Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
              Date Format
            </label>
            <select
              value={generalSettings.dateFormat}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  dateFormat: e.target.value,
                })
              }
              className={inputCls}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-5 text-lg leading-tight">
          Notifications
        </h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={generalSettings.autoBackup}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  autoBackup: e.target.checked,
                })
              }
              className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 transition-colors cursor-pointer"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Automatic Backup
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal">
                Daily automatic backup of all data
              </p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={generalSettings.emailNotifications}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  emailNotifications: e.target.checked,
                })
              }
              className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 transition-colors cursor-pointer"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Email Notifications
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal">
                Receive email alerts for important events
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleGeneralSettingsSave}
          className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors shadow-sm border border-slate-200 dark:border-transparent leading-tight"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
