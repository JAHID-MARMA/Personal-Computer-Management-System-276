import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiBell, FiMonitor, FiShield, FiDatabase, FiDownload, FiUpload, FiRefreshCw } = FiIcons;

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      taskReminders: true,
      systemAlerts: true,
      workSessionBreaks: false,
      emailNotifications: true
    },
    appearance: {
      theme: 'dark',
      sidebarCollapsed: false,
      animations: true,
      compactMode: false
    },
    performance: {
      autoCleanup: true,
      backgroundMonitoring: true,
      dataCollection: false,
      autoBackup: true
    },
    privacy: {
      analytics: false,
      crashReports: true,
      usageData: false,
      locationTracking: false
    }
  });

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const SettingSection = ({ title, icon, children }) => (
    <motion.div
      className="glass-effect rounded-xl p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-600 rounded-lg">
          <SafeIcon icon={icon} className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const ToggleSetting = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="font-medium">{label}</h4>
        {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SelectSetting = ({ label, description, value, options, onChange }) => (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-medium">{label}</h4>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const ActionButton = ({ label, description, icon, color, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-all text-left ${color}`}
    >
      <div className="flex items-center space-x-3">
        <SafeIcon icon={icon} className="w-5 h-5" />
        <div>
          <h4 className="font-medium">{label}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Customize your Personal MCP experience</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <SettingSection title="Notifications" icon={FiBell}>
          <ToggleSetting
            label="Task Reminders"
            description="Get notified about upcoming task deadlines"
            checked={settings.notifications.taskReminders}
            onChange={(value) => updateSetting('notifications', 'taskReminders', value)}
          />
          <ToggleSetting
            label="System Alerts"
            description="Receive alerts about system performance issues"
            checked={settings.notifications.systemAlerts}
            onChange={(value) => updateSetting('notifications', 'systemAlerts', value)}
          />
          <ToggleSetting
            label="Work Session Breaks"
            description="Reminders to take breaks during work sessions"
            checked={settings.notifications.workSessionBreaks}
            onChange={(value) => updateSetting('notifications', 'workSessionBreaks', value)}
          />
          <ToggleSetting
            label="Email Notifications"
            description="Send important updates via email"
            checked={settings.notifications.emailNotifications}
            onChange={(value) => updateSetting('notifications', 'emailNotifications', value)}
          />
        </SettingSection>

        {/* Appearance */}
        <SettingSection title="Appearance" icon={FiMonitor}>
          <SelectSetting
            label="Theme"
            description="Choose your preferred color scheme"
            value={settings.appearance.theme}
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
              { value: 'auto', label: 'Auto' }
            ]}
            onChange={(value) => updateSetting('appearance', 'theme', value)}
          />
          <ToggleSetting
            label="Sidebar Collapsed"
            description="Start with sidebar in collapsed state"
            checked={settings.appearance.sidebarCollapsed}
            onChange={(value) => updateSetting('appearance', 'sidebarCollapsed', value)}
          />
          <ToggleSetting
            label="Animations"
            description="Enable smooth animations and transitions"
            checked={settings.appearance.animations}
            onChange={(value) => updateSetting('appearance', 'animations', value)}
          />
          <ToggleSetting
            label="Compact Mode"
            description="Use more compact layouts to fit more content"
            checked={settings.appearance.compactMode}
            onChange={(value) => updateSetting('appearance', 'compactMode', value)}
          />
        </SettingSection>

        {/* Performance */}
        <SettingSection title="Performance" icon={FiDatabase}>
          <ToggleSetting
            label="Auto Cleanup"
            description="Automatically clean temporary files and cache"
            checked={settings.performance.autoCleanup}
            onChange={(value) => updateSetting('performance', 'autoCleanup', value)}
          />
          <ToggleSetting
            label="Background Monitoring"
            description="Monitor system performance in the background"
            checked={settings.performance.backgroundMonitoring}
            onChange={(value) => updateSetting('performance', 'backgroundMonitoring', value)}
          />
          <ToggleSetting
            label="Data Collection"
            description="Collect usage data to improve performance"
            checked={settings.performance.dataCollection}
            onChange={(value) => updateSetting('performance', 'dataCollection', value)}
          />
          <ToggleSetting
            label="Auto Backup"
            description="Automatically backup important data"
            checked={settings.performance.autoBackup}
            onChange={(value) => updateSetting('performance', 'autoBackup', value)}
          />
        </SettingSection>

        {/* Privacy */}
        <SettingSection title="Privacy & Security" icon={FiShield}>
          <ToggleSetting
            label="Analytics"
            description="Share anonymous usage analytics"
            checked={settings.privacy.analytics}
            onChange={(value) => updateSetting('privacy', 'analytics', value)}
          />
          <ToggleSetting
            label="Crash Reports"
            description="Send crash reports to help improve stability"
            checked={settings.privacy.crashReports}
            onChange={(value) => updateSetting('privacy', 'crashReports', value)}
          />
          <ToggleSetting
            label="Usage Data"
            description="Collect data about feature usage"
            checked={settings.privacy.usageData}
            onChange={(value) => updateSetting('privacy', 'usageData', value)}
          />
          <ToggleSetting
            label="Location Tracking"
            description="Allow location-based features"
            checked={settings.privacy.locationTracking}
            onChange={(value) => updateSetting('privacy', 'locationTracking', value)}
          />
        </SettingSection>
      </div>

      {/* Actions */}
      <motion.div
        className="glass-effect rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
          </div>
          <span>Data Management</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton
            label="Export Data"
            description="Download all your data as a backup"
            icon={FiDownload}
            color="hover:bg-green-900/20"
            onClick={() => console.log('Export data')}
          />
          <ActionButton
            label="Import Data"
            description="Restore data from a previous backup"
            icon={FiUpload}
            color="hover:bg-blue-900/20"
            onClick={() => console.log('Import data')}
          />
          <ActionButton
            label="Reset Settings"
            description="Reset all settings to default values"
            icon={FiRefreshCw}
            color="hover:bg-yellow-900/20"
            onClick={() => console.log('Reset settings')}
          />
          <ActionButton
            label="Clear All Data"
            description="Permanently delete all stored data"
            icon={FiDatabase}
            color="hover:bg-red-900/20"
            onClick={() => console.log('Clear data')}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;