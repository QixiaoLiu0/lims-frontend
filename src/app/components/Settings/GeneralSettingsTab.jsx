import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function GeneralSettingsTab({ 
  generalSettings, 
  setGeneralSettings, 
  handleGeneralSettingsSave, 
  inputCls, 
  isDark, 
  toggleTheme 
}) {
  return (
    <div className="space-y-3">
      {/* Appearance */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">Theme</p>
            <p className="text-sm text-slate-500 dark:text-slate-200">Switch between light and dark mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-medium transition-all ${
              isDark ?
              'bg-slate-700 border-slate-500 text-slate-100 hover:bg-slate-600' :
              'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}>
            {isDark ?
              <><Moon className="w-4 h-4 text-blue-400" /> Dark Mode</> :
              <><Sun className="w-4 h-4 text-yellow-500" /> Light Mode</>
            }
          </button>
        </div>
      </div>

      {/* Laboratory Information */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Laboratory Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">Laboratory Name</label>
            <input type="text" value={generalSettings.labName} onChange={(e) => setGeneralSettings({ ...generalSettings, labName: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">Contact Email</label>
            <input type="email" value={generalSettings.email} onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">Phone Number</label>
            <input type="tel" value={generalSettings.phone} onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">Timezone</label>
            <select value={generalSettings.timezone} onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })} className={inputCls}>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">Address</label>
            <textarea value={generalSettings.address} onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })} rows={2} className={`${inputCls} resize-none`} />
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">System Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">Date Format</label>
            <select value={generalSettings.dateFormat} onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })} className={inputCls}>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={generalSettings.autoBackup} onChange={(e) => setGeneralSettings({ ...generalSettings, autoBackup: e.target.checked })} className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700" />
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Automatic Backup</p>
              <p className="text-base text-gray-400 dark:text-slate-200">Daily automatic backup of all data</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={generalSettings.emailNotifications} onChange={(e) => setGeneralSettings({ ...generalSettings, emailNotifications: e.target.checked })} className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700" />
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Email Notifications</p>
              <p className="text-base text-gray-400 dark:text-slate-200">Receive email alerts for important events</p>
            </div>
          </label>
        </div>
      </div>

      <div className="pt-2">
        <button onClick={handleGeneralSettingsSave} className="px-6 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
